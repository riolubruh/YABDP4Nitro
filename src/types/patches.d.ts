export interface Patch {
    name: string;
    description: string;
    ids?: (string | number)[];
    waitFor?: WebpackFilter | WebpackFilter[];
    apply(finale: Record<any, object>, patcher: typeof BdApi.Patcher): void;
    revert?(): void;
}