export interface Patch {
    name: string;
    description: string;
    ids?: (string | number)[];
    waitFor?: WebpackFilter | WebpackFilter[];
    apply(patcher: typeof BdApi.Patcher): void;
    revert?(): void;
}