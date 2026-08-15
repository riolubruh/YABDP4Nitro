type ValueMap = Record<string, unknown>;

type AnyFn = (...args: any[]) => any;

interface ReplaceFunctionLiteralOptions {
    find: string | RegExp;
    replace: string;
    throwIfMissing?: boolean;
}

interface ForceFunctionVarsOptions {
    after: string;
    offset?: number;
    sets: ValueMap;
    throwIfMissingAnchor?: boolean;
}

function parseDestructuredVars(fnStr: string): Record<string, string> {
    const letIndex = fnStr.indexOf("let{");
    if (letIndex === -1) throw new Error("No let{...} destructure found");
    const openBrace = letIndex + 4;
    const closeBrace = fnStr.indexOf("}", openBrace);
    if (closeBrace === -1) throw new Error("No matching closing brace");
    const body = fnStr.slice(openBrace, closeBrace);
    return Object.fromEntries(
        body
            .split(",")
            .map(c => c.trim())
            .filter(Boolean)
            .map(chunk => {
                const [remote, local] = chunk.split(":").map(s => s.trim());
                return [remote, local || remote] as [string, string];
            })
    );
}

function serializeValue(value: unknown): string {
    if (typeof value === "string") return JSON.stringify(value);
    if (value === undefined) return "undefined";
    if (typeof value === "object" && value !== null) return JSON.stringify(value);
    return String(value);
}

// IDEA FROM DOGGYBOOTSY. I found this useful and make it a helper file.
// will definitely use later.

function forceFunctionVars<T extends AnyFn>(fn: T, declarations: object, options: ForceFunctionVarsOptions): T | null {
    const { after, offset = 0, sets, throwIfMissingAnchor = true } = options;
    if (!after) throw new Error("options.after is required");
    if (!sets || Object.keys(sets).length === 0) throw new Error("options.sets needs at least one entry");

    const str = fn.toString();
    const vars = parseDestructuredVars(str);

    const missing = Object.keys(sets).filter(name => !vars[name]);
    if (missing.length) throw new Error(`Could not resolve: ${missing.join(", ")}`);

    const anchorIndex = str.indexOf(after);
    if (anchorIndex === -1) {
        if (throwIfMissingAnchor) throw new Error(`Anchor not found: "${after}"`);
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
        return new Function("__DECLARATIONS__", source)(declarations) as T;
    } catch (err) {
        throw new Error(`Compile failed: ${(err as Error).message}\n${source}`);
    }
}

function replaceFunctionLiteral<T extends AnyFn>(fn: T, declarations: object, options: ReplaceFunctionLiteralOptions): T {
    const { find, replace, throwIfMissing = true } = options;
    const str = fn.toString();

    const found = typeof find === "string" ? str.includes(find) : find.test(str);
    if (!found && throwIfMissing) throw new Error(`Pattern not found: ${find}`);

    const patched = str.replace(find as any, replace);
    const source = `with (__DECLARATIONS__) return (${patched});`;

    try {
        return new Function("__DECLARATIONS__", source)(declarations) as T;
    } catch (err) {
        throw new Error(`Compile failed: ${(err as Error).message}\n${source}`);
    }
}

export { forceFunctionVars, replaceFunctionLiteral, parseDestructuredVars, serializeValue };
export type { ForceFunctionVarsOptions, ReplaceFunctionLiteralOptions, ValueMap, AnyFn };