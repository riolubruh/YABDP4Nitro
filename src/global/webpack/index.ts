const { Webpack } = BdApi;

type ModuleFilter = (m: any) => boolean;
type PatchType = "before" | "after" | "instead";

interface GetOptions extends WebpackOptions {
  raw?: boolean;
  key?: string;
  declaration?: ModuleFilter;
}

interface WaitOptions extends WebpackLazyOptions {
  raw?: boolean;
  declaration?: ModuleFilter;
}

interface QueryBase {
  options?: GetOptions;
}

type Query =
  | ({ filter: ModuleFilter } & QueryBase)
  | ({ keys: string[] } & QueryBase)
  | ({ prototypeKeys: string[] } & QueryBase)
  | ({ strings: string[] } & QueryBase)
  | ({ source: (string | RegExp)[] } & QueryBase)
  | ({ regex: RegExp } & QueryBase)
  | ({ displayName: string } & QueryBase)
  | ({ storeName: string } & QueryBase);

interface WaitQueryBase {
  options?: WaitOptions;
}

type WaitQuery =
  | ({ filter: ModuleFilter } & WaitQueryBase)
  | ({ keys: string[] } & WaitQueryBase)
  | ({ prototypeKeys: string[] } & WaitQueryBase)
  | ({ strings: string[] } & WaitQueryBase)
  | ({ source: (string | RegExp)[] } & WaitQueryBase)
  | ({ regex: RegExp } & WaitQueryBase)
  | ({ displayName: string } & WaitQueryBase)
  | ({ storeName: string } & WaitQueryBase);

interface WaitWithTimeoutOptions extends WaitOptions {
  timeout?: number;
}

interface PatchOnceConfig<M extends object, K extends Extract<keyof M, string>> {
  patcher: PatcherAPI;
  pluginName: string;
  type?: PatchType;
  filter: ModuleFilter;
  key: K;
  callback:
    | Parameters<PatcherAPI["before"]>[2]
    | Parameters<PatcherAPI["after"]>[2]
    | Parameters<PatcherAPI["instead"]>[2];
  waitOptions?: WaitOptions;
}

interface PatchQueryConfig<M extends object, K extends Extract<keyof M, string>> {
  patcher: PatcherAPI;
  pluginName: string;
  type?: PatchType;
  query: WaitQuery;
  key: K;
  callback:
    | Parameters<PatcherAPI["before"]>[2]
    | Parameters<PatcherAPI["after"]>[2]
    | Parameters<PatcherAPI["instead"]>[2];
}

interface ForceLoadExportEntry {
  filter: ModuleFilter;
  declarations?: boolean;
  options?: GetOptions;
}

interface ForceLoadExportMangledEntry<T extends Record<string, any>> {
  filter: string | RegExp | ModuleFilter;
  declarations: true;
  map: { [K in keyof T]: ModuleFilter };
  options?: GetOptions;
}

type ForceLoadExportMap = Record<string, ForceLoadExportEntry | ForceLoadExportMangledEntry<any>>;

type ForceLoadResult<T extends ForceLoadExportMap> = {
  [K in keyof T]: T[K] extends ForceLoadExportMangledEntry<infer M> ? M : any;
};

function queryToFilter(query: Query | WaitQuery): ModuleFilter {
  if ("filter" in query) return query.filter;
  if ("keys" in query) return Webpack.Filters.byKeys(...query.keys) as any;
  if ("prototypeKeys" in query)
    return Webpack.Filters.byPrototypeKeys(...query.prototypeKeys) as any;
  if ("strings" in query) return Webpack.Filters.byStrings(...query.strings) as any;
  if ("source" in query) return Webpack.Filters.bySource(...query.source) as any;
  if ("regex" in query) return Webpack.Filters.byRegex(query.regex) as any;
  if ("displayName" in query) return Webpack.Filters.byDisplayName(query.displayName) as any;
  return Webpack.Filters.byStoreName(query.storeName) as any;
}

function resolveModule<T = any>(filter: ModuleFilter, options?: GetOptions): T | null {
  const opts = options ?? {};
  if (opts.declaration) {
    const { declaration, key, raw, ...rest } = opts;
    const result = Webpack.getMangled(filter as any, { __value: declaration } as any, {
      ...rest,
      mapDeclarations: true,
    }) as { __value: T } | undefined;
    return result?.__value ?? null;
  }
  const mod = Webpack.getModule(filter as any, opts) as T | undefined;
  if (mod == null) return null;
  return opts.key ? (mod as any)[opts.key] : mod;
}

async function resolveModuleAsync<T = any>(
  filter: ModuleFilter,
  options?: WaitOptions
): Promise<T | null> {
  const opts = options ?? {};
  if (opts.declaration) {
    const { declaration, raw, ...rest } = opts;
    await Webpack.waitForModule(filter as any, rest);
    return resolveModule<T>(filter, opts as GetOptions);
  }
  return ((await Webpack.waitForModule(filter as any, opts)) as T) ?? null;
}

function resolveQuery(query: Query): any {
  if ("map" in (query as any)) {
    const q = query as any;
    const newModule: Record<string, any> = {};
    const foundModule = Webpack.getModule(q.filter as any);

    if (foundModule) {
      const remaining = new Map(Object.entries(q.map));

      for (const value of Object.values(foundModule)) {
        for (const [queryKey, queryValue] of remaining) {
          if ((queryValue as ModuleFilter)(value)) {
            newModule[queryKey] = value;
            remaining.delete(queryKey);
            break;
          }
        }
        if (remaining.size === 0) break;
      }
    }

    return newModule;
  }

  return resolveModule(queryToFilter(query), query.options);
}

function resolveWaitQuery(query: WaitQuery): Promise<any> {
  return resolveModuleAsync(queryToFilter(query), query.options);
}

function runPatch<M extends object, K extends Extract<keyof M, string>>(
  patcher: PatcherAPI,
  pluginName: string,
  type: PatchType,
  mod: M,
  key: K,
  callback: PatchOnceConfig<M, K>["callback"]
): (() => void) | null {
  return patcher[type](pluginName, mod, key, callback);
}

export const wpFilter = {
  byKeys: (...keys: string[]) => Webpack.Filters.byKeys(...keys),
  byPrototypeKeys: (...keys: string[]) => Webpack.Filters.byPrototypeKeys(...keys),
  byStrings: (...strings: string[]) => Webpack.Filters.byStrings(...strings),
  bySource: (...source: Array<string | RegExp>) => Webpack.Filters.bySource(...source),
  byRegex: (regex: RegExp) => Webpack.Filters.byRegex(regex),
  byDisplayName: (name: string) => Webpack.Filters.byDisplayName(name),
  byStoreName: (name: string) => Webpack.Filters.byStoreName(name),
  combine: (...filters: ModuleFilter[]) => Webpack.Filters.combine(...(filters as any)),
  not: (filter: ModuleFilter) => Webpack.Filters.not(filter as any),
};

export function wpGet<T = any>(filter: ModuleFilter, options?: GetOptions): T | null {
  return resolveModule<T>(filter, options);
}

export function wpGetAll<T = any>(filter: ModuleFilter, options?: GetOptions): T[] {
  return (Webpack.getModules(filter as any, options ?? {}) as T[]) ?? [];
}

export function wpGetByKeys<T = any>(keys: string[], options?: GetOptions): T | null {
  return resolveModule<T>(Webpack.Filters.byKeys(...keys) as any, options);
}

export function wpGetAllByKeys<T = any>(keys: string[], options?: GetOptions): T[] {
  return (Webpack.getModules(Webpack.Filters.byKeys(...keys) as any, options ?? {}) as T[]) ?? [];
}

export function wpGetByPrototypeKeys<T = any>(keys: string[], options?: GetOptions): T | null {
  return resolveModule<T>(Webpack.Filters.byPrototypeKeys(...keys) as any, options);
}

export function wpGetByStrings<T = any>(strings: string[], options?: GetOptions): T | null {
  return resolveModule<T>(Webpack.Filters.byStrings(...strings) as any, options);
}

export function wpGetBySource<T = any>(
  source: Array<string | RegExp>,
  options?: GetOptions
): T | null {
  return resolveModule<T>(Webpack.Filters.bySource(...source) as any, options);
}

export function wpGetByRegex<T = any>(regex: RegExp, options?: GetOptions): T | null {
  return resolveModule<T>(Webpack.Filters.byRegex(regex) as any, options);
}

export function wpGetByDisplayName<T = any>(displayName: string, options?: GetOptions): T | null {
  return resolveModule<T>(Webpack.Filters.byDisplayName(displayName) as any, options);
}

export function wpGetStore<T = any>(storeName: string, options?: GetOptions): T | null {
  return resolveModule<T>(Webpack.Filters.byStoreName(storeName) as any, options);
}

export function wpGetWithKey<T = any>(
  filter: ModuleFilter,
  options?: GetOptions
): {
  mod: T;
  foundKey: string | unknown;
} | null {
  let foundKey: string | undefined;
  const mod = Webpack.getModule((exports: any) => {
    if (!exports || (typeof exports !== "object" && typeof exports !== "function")) return false;
    if (filter(exports)) {
      foundKey = undefined;
      return true;
    }
    for (const key in exports) {
      if (filter(exports[key])) {
        foundKey = key;
        return true;
      }
    }
    return false;
  }, options ?? {}) as T | undefined;
  if (!mod) return null;
  return { mod, foundKey };
}

export function wpGetAny<T extends Query[]>(...queries: [...T]): any {
  for (const query of queries) {
    const found = resolveQuery(query);
    if (found != null) return found;
  }
  return null;
}

export function wpGetBulk<T extends Query[]>(...queries: [...T]): { [K in keyof T]: any } {
  return queries.map(resolveQuery) as any;
}

export function wpGetBulkKeyed<T extends Record<string, Query>>(
  queries: T
): { [K in keyof T]: any } {
  return Object.fromEntries(
    Object.entries(queries).map(([key, query]) => [key, resolveQuery(query as Query)])
  ) as any;
}

export function wpGetMangled<T extends Record<string, any>>(
  filter: string | RegExp | ModuleFilter,
  map: { [K in keyof T]: ModuleFilter },
  options?: GetOptions
): T {
  return Webpack.getMangled(filter as any, map as any, {
    ...(options ?? {}),
    mapDeclarations: true,
  }) as T;
}

export async function forceLoadWithExports<T extends ForceLoadExportMap>(
  id: number | string,
  map: T
): Promise<ForceLoadResult<T>> {
  await (BdApi.Utils as any).forceLoad(id);
  const result: Record<string, any> = {};
  for (const [key, entry] of Object.entries(map)) {
    if ("map" in entry && entry.declarations) {
      const e = entry as ForceLoadExportMangledEntry<any>;
      result[key] = Webpack.getMangled(e.filter as any, e.map as any, {
        ...(e.options ?? {}),
        mapDeclarations: true,
      });
    } else {
      const e = entry as ForceLoadExportEntry;
      result[key] = (Webpack.getModule(e.filter as any, e.options ?? {}) as any) ?? null;
    }
  }
  return result as ForceLoadResult<T>;
}

export async function wpWait<T = any>(
  filter: ModuleFilter,
  options?: WaitOptions
): Promise<T | null> {
  return resolveModuleAsync<T>(filter, options);
}

export function wpWaitByKeys<T = any>(keys: string[], options?: WaitOptions): Promise<T | null> {
  return resolveModuleAsync<T>(Webpack.Filters.byKeys(...keys) as any, options);
}

export function wpWaitByPrototypeKeys<T = any>(
  keys: string[],
  options?: WaitOptions
): Promise<T | null> {
  return resolveModuleAsync<T>(Webpack.Filters.byPrototypeKeys(...keys) as any, options);
}

export function wpWaitByStrings<T = any>(
  strings: string[],
  options?: WaitOptions
): Promise<T | null> {
  return resolveModuleAsync<T>(Webpack.Filters.byStrings(...strings) as any, options);
}

export function wpWaitBySource<T = any>(
  source: Array<string | RegExp>,
  options?: WaitOptions
): Promise<T | null> {
  return resolveModuleAsync<T>(Webpack.Filters.bySource(...source) as any, options);
}

export function wpWaitByRegex<T = any>(regex: RegExp, options?: WaitOptions): Promise<T | null> {
  return resolveModuleAsync<T>(Webpack.Filters.byRegex(regex) as any, options);
}

export function wpWaitByDisplayName<T = any>(
  displayName: string,
  options?: WaitOptions
): Promise<T | null> {
  return resolveModuleAsync<T>(Webpack.Filters.byDisplayName(displayName) as any, options);
}

export function wpWaitForStore<T = any>(
  storeName: string,
  options?: WaitOptions
): Promise<T | null> {
  return resolveModuleAsync<T>(Webpack.Filters.byStoreName(storeName) as any, options);
}

export async function wpWaitWithTimeout<T = any>(
  filter: ModuleFilter,
  { timeout = 10000, ...options }: WaitWithTimeoutOptions = {}
): Promise<T | null> {
  return Promise.race([
    resolveModuleAsync<T>(filter, options),
    new Promise<T | null>((resolve) => setTimeout(() => resolve(null), timeout)),
  ]);
}

export async function wpWaitAny<T extends WaitQuery[]>(...queries: [...T]): Promise<any> {
  for (const query of queries) {
    const found = await resolveWaitQuery(query);
    if (found != null) return found;
  }
  return null;
}

export function wpWaitBulk<T extends WaitQuery[]>(
  ...queries: [...T]
): Promise<{ [K in keyof T]: any }> {
  return Promise.all(queries.map(resolveWaitQuery)) as any;
}

export async function wpWaitBulkKeyed<T extends Record<string, WaitQuery>>(
  queries: T
): Promise<{ [K in keyof T]: any }> {
  const entries = await Promise.all(
    Object.entries(queries).map(
      async ([key, query]) => [key, await resolveWaitQuery(query as WaitQuery)] as const
    )
  );
  return Object.fromEntries(entries) as any;
}

export async function wpWaitMangled<T extends Record<string, any>>(
  locator: string | RegExp | ModuleFilter,
  map: { [K in keyof T]: ModuleFilter },
  options?: WaitOptions
): Promise<T> {
  const filter =
    typeof locator === "function"
      ? (locator as any)
      : (Webpack.Filters.bySource(locator as any) as any);
  await Webpack.waitForModule(filter, options ?? {});
  return Webpack.getMangled(locator as any, map as any, {
    ...(options ?? {}),
    mapDeclarations: true,
  }) as T;
}

export async function wpWaitDeclaration<T = any>(
  query: WaitQuery,
  match: ModuleFilter
): Promise<T | null> {
  return resolveWaitQuery({
    ...query,
    options: { ...(query.options ?? {}), declaration: match },
  } as WaitQuery);
}

export function wpGetDeclaration<T = any>(query: Query, match: ModuleFilter): T | null {
  return resolveQuery({
    ...query,
    options: { ...(query.options ?? {}), declaration: match },
  } as Query);
}

export async function wpPatchOnce<M extends object, K extends Extract<keyof M, string>>(
  config: PatchOnceConfig<M, K>
): Promise<(() => void) | null> {
  const mod = (await Webpack.waitForModule(config.filter as any, config.waitOptions ?? {})) as
    M | undefined;
  if (!mod) return null;
  return runPatch(
    config.patcher,
    config.pluginName,
    config.type ?? "after",
    mod,
    config.key,
    config.callback
  );
}

export async function wpPatchOnceByQuery<M extends object, K extends Extract<keyof M, string>>(
  config: PatchQueryConfig<M, K>
): Promise<(() => void) | null> {
  const mod = (await resolveWaitQuery(config.query)) as M | undefined;
  if (!mod) return null;
  return runPatch(
    config.patcher,
    config.pluginName,
    config.type ?? "after",
    mod,
    config.key,
    config.callback
  );
}

export async function wpPatchMany<M extends object, K extends Extract<keyof M, string>>(
  patcher: PatcherAPI,
  pluginName: string,
  type: PatchType,
  key: K,
  callback: PatchOnceConfig<M, K>["callback"],
  ...queries: WaitQuery[]
): Promise<Array<(() => void) | null>> {
  const modules = await wpWaitBulk(...queries);
  return modules.map((mod) =>
    mod ? runPatch(patcher, pluginName, type, mod as M, key, callback) : null
  );
}

type WaitQueryWithTimeout =
  | { filter: ModuleFilter; options?: WaitWithTimeoutOptions }
  | { keys: string[]; options?: WaitWithTimeoutOptions }
  | { prototypeKeys: string[]; options?: WaitWithTimeoutOptions }
  | { strings: string[]; options?: WaitWithTimeoutOptions }
  | { source: (string | RegExp)[]; options?: WaitWithTimeoutOptions }
  | { regex: RegExp; options?: WaitWithTimeoutOptions }
  | { displayName: string; options?: WaitWithTimeoutOptions }
  | { storeName: string; options?: WaitWithTimeoutOptions };

function resolveWaitQueryWithTimeout(query: WaitQueryWithTimeout): Promise<any> {
  const { timeout = 10000, ...opts } = query.options ?? {};
  return Promise.race([
    resolveWaitQuery({ ...query, options: opts } as WaitQuery),
    new Promise<any>((resolve) => setTimeout(() => resolve(null), timeout)),
  ]);
}

export function wpWaitGetBulk<T extends WaitQueryWithTimeout[]>(
  ...queries: [...T]
): Promise<{ [K in keyof T]: any }> {
  return Promise.all(queries.map(resolveWaitQueryWithTimeout)) as any;
}

export async function wpWaitGetBulkKeyed<T extends Record<string, WaitQueryWithTimeout>>(
  queries: T
): Promise<{ [K in keyof T]: any }> {
  const entries = await Promise.all(
    Object.entries(queries).map(
      async ([key, query]) =>
        [key, await resolveWaitQueryWithTimeout(query as WaitQueryWithTimeout)] as const
    )
  );
  return Object.fromEntries(entries) as any;
}

type PathSegment = string | symbol;

const PASSTHROUGH_PROPS = new Set<PathSegment>([
  "then",
  "toJSON",
  "valueOf",
  "toString",
  Symbol.toPrimitive,
  Symbol.toStringTag,
  Symbol.iterator,
]);

const IDENTITY_PROPS = new Set<PathSegment>([
  "prototype",
  "contextType",
  "defaultProps",
  "$$typeof",
]);

function resolveLive(
  filter: ModuleFilter,
  options: GetOptions | undefined,
  path: PathSegment[]
): any {
  let current: any = resolveModule(filter, options);
  for (const seg of path) {
    if (current == null) return undefined;
    current = current[seg as any];
  }
  return current;
}

function createLiveProxy(
  filter: ModuleFilter,
  options: GetOptions | undefined,
  path: PathSegment[]
): any {
  const target = function wpGetProxyTarget() {} as any; // constructible target

  return new Proxy(target, {
    get(_t, prop) {
      if (PASSTHROUGH_PROPS.has(prop) || IDENTITY_PROPS.has(prop)) {
        const val = resolveLive(filter, options, path);
        if (val == null) return undefined;
        const member = (val as any)[prop as any];
        return typeof member === "function" ? member.bind(val) : member;
      }
      return createLiveProxy(filter, options, [...path, prop]);
    },

    apply(_t, thisArg, args) {
      const fn = resolveLive(filter, options, path);
      const parent = resolveLive(filter, options, path.slice(0, -1));
      return fn.apply(parent ?? thisArg, args);
    },

    construct(_t, args, _newTarget) {
      const ctor = resolveLive(filter, options, path);
      if (typeof ctor !== "function") {
        throw new TypeError(`${String(path[path.length - 1] ?? "target")} is not a constructor`);
      }
      return Reflect.construct(ctor, args, ctor); // always use the real ctor as newTarget
    },

    set(_t, prop, value) {
      const val = resolveLive(filter, options, path);
      if (val == null) return false;
      (val as any)[prop as any] = value;
      return true;
    },

    has(_t, prop) {
      const val = resolveLive(filter, options, path);
      return val != null && prop in Object(val);
    },

    ownKeys(_t) {
      const val = resolveLive(filter, options, path);
      const keys = val ? Reflect.ownKeys(val) : [];
      // 'prototype' is a non-configurable own key on the target function,
      // so the invariant requires it to always appear in the trap result.
      if (!keys.includes("prototype")) keys.push("prototype");
      return keys;
    },

    getOwnPropertyDescriptor(_t, prop) {
      if (prop === "prototype") {
        // Must exactly match the target's real (non-configurable) descriptor,
        // can't fabricate one for this key without violating the invariant.
        return Reflect.getOwnPropertyDescriptor(_t, prop);
      }
      const val = resolveLive(filter, options, path);
      if (val == null) return undefined;
      return (
        Object.getOwnPropertyDescriptor(val, prop) ?? {
          enumerable: true,
          configurable: true,
          value: (val as any)[prop as any],
        }
      );
    },
  });
}

export function wpGetProxy<T = any>(filter: ModuleFilter, options?: GetOptions): T {
  return createLiveProxy(filter, options, []) as T;
}

export function wpGetProxyQuery<T = any>(query: Query): T {
  return createLiveProxy(queryToFilter(query), query.options, []) as T;
}

export function getKey(module2, fn) {
  for (const key in module2) {
    if (fn(module2[key])) return { key, module: module2 };
  }
}
