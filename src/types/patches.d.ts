export type IdEntry = number | (() => number | Promise<number>);
export type Ids = IdEntry[] | (() => IdEntry[] | Promise<IdEntry[]>);

export interface Patch {
    name: string;
    description: string;
    ids?: Ids;
    waitFor?: any[];
    mangled?: MangleMap;
    apply(finale: any, patcher: any): void;
    revert?(): void;
}