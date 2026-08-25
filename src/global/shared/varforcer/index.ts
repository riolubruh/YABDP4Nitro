function normalizeFunctionSource(str) {
  const trimmed = str.trimStart();
  if (/^function\b/.test(trimmed)) return str;

  const arrowIdx = str.indexOf("=>");
  const braceIdx = str.indexOf("{");
  if (arrowIdx !== -1 && (braceIdx === -1 || arrowIdx < braceIdx)) return str;

  let rest = trimmed;
  let isAsync = false;
  let isGenerator = false;

  if (rest.startsWith("async")) {
    isAsync = true;
    rest = rest.slice(5).trimStart();
  }
  if (rest.startsWith("*")) {
    isGenerator = true;
    rest = rest.slice(1).trimStart();
  }

  const parenIdx = rest.indexOf("(");
  if (parenIdx === -1)
    throw new Error("[varForcer] Could not normalize function source (no `(` found).");
  rest = rest.slice(parenIdx);

  return `${isAsync ? "async " : ""}function${isGenerator ? "*" : ""} ${rest}`;
}

function parseDestructuredVars(fnStr) {
  const letIndex = fnStr.indexOf("let{");
  if (letIndex === -1) {
    throw new Error("[varForcer] Could not find a `let{...}` destructure in the given function.");
  }

  const openBrace = letIndex + 4;
  const closeBrace = fnStr.indexOf("}", openBrace);
  if (closeBrace === -1) {
    throw new Error("[varForcer] Found `let{` but no matching closing `}`.");
  }

  const body = fnStr.slice(openBrace, closeBrace);

  const entries = body
    .split(",")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [remote, local] = chunk.split(":").map((s) => s.trim());
      return [remote, local || remote];
    });

  return Object.fromEntries(entries);
}

function serializeValue(value) {
  if (typeof value === "string") return JSON.stringify(value);
  if (value === undefined) return "undefined";
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return String(value);
}

function forceFunctionVars(fn, declarations, options) {
  const { after, offset = 0, sets, throwIfMissingAnchor = true } = options;

  if (!after) throw new Error("[varForcer] `options.after` (anchor string) is required.");
  if (!sets || Object.keys(sets).length === 0)
    throw new Error("[varForcer] `options.sets` must have at least one entry.");

  const str = normalizeFunctionSource(fn.toString());
  const vars = parseDestructuredVars(str);

  const missing = Object.keys(sets).filter((name) => !vars[name]);
  if (missing.length) {
    throw new Error(
      `[varForcer] Could not resolve destructured var(s): ${missing.join(", ")}. Found: ${Object.keys(vars).join(", ")}`
    );
  }

  const anchorIndex = str.indexOf(after);
  if (anchorIndex === -1) {
    if (throwIfMissingAnchor)
      throw new Error(`[varForcer] Could not find anchor string: "${after}"`);
    return null;
  }

  const insertAt = anchorIndex + after.length + offset;
  const before = str.slice(0, insertAt);
  const rest = str.slice(insertAt);

  const assignments = Object.entries(sets)
    .map(([name, value]) => `${vars[name]}=${serializeValue(value)};`)
    .join("");

  const source = `with (__DECLARATIONS__) return (${before}${assignments}${rest});`;

  try {
    return new Function("__DECLARATIONS__", source)(declarations);
  } catch (err) {
    throw new Error(
      `[varForcer] Failed to compile patched function: ${err.message}\n\nGenerated source:\n${source}`
    );
  }
}

function replaceFunctionLiteral(fn, declarations, options) {
  const { find, replace, throwIfMissing = true } = options;
  const str = normalizeFunctionSource(fn.toString());

  const found = typeof find === "string" ? str.includes(find) : find.test(str);
  if (!found && throwIfMissing) throw new Error(`[varForcer] Pattern not found: ${find}`);

  const patched = str.replace(find, replace);
  const source = `with (__DECLARATIONS__) return (${patched});`;

  try {
    return new Function("__DECLARATIONS__", source)(declarations);
  } catch (err) {
    throw new Error(
      `[varForcer] Failed to compile patched function: ${err.message}\n\nGenerated source:\n${source}`
    );
  }
}

module.exports = {
  forceFunctionVars,
  replaceFunctionLiteral,
  parseDestructuredVars,
  serializeValue,
  normalizeFunctionSource,
};
