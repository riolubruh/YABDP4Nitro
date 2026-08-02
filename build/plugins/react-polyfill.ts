import type { BunPlugin } from "bun";

const REACT_EXPORTS = [
    "Children",
    "Component",
    "Fragment",
    "Profiler",
    "PureComponent",
    "StrictMode",
    "Suspense",
    "cloneElement",
    "createContext",
    "createElement",
    "createFactory",
    "createRef",
    "forwardRef",
    "isValidElement",
    "lazy",
    "memo",
    "startTransition",
    "unstable_act",
    "useCallback",
    "useContext",
    "useDebugValue",
    "useDeferredValue",
    "useEffect",
    "useId",
    "useImperativeHandle",
    "useInsertionEffect",
    "useLayoutEffect",
    "useMemo",
    "useReducer",
    "useRef",
    "useState",
    "useSyncExternalStore",
    "useTransition",
    "version",
];

function buildReactShim() {
    const named = REACT_EXPORTS
        .map((key) => `export const ${key} = BdApi.React["${key}"];`)
        .join("\n");

    return `${named}\nexport default BdApi.React;\n`;
}

export const reactPolyfillPlugin: BunPlugin = {
    name: "bdapi-react-polyfill",
    setup(build) {
        build.onResolve({ filter: /^react$/ }, (args) => ({
            path: args.path,
            namespace: "bdapi-react-shim",
        }));

        build.onLoad({ filter: /^react$/, namespace: "bdapi-react-shim" }, () => ({
            contents: buildReactShim(),
            loader: "js",
        }));
    },
};