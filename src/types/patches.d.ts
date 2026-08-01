export interface Patch {
    name: string;
    description: string;
    ids?: number[];
    waitFor?: any[];
    mangled?: MangleMap;
    apply(finale: any, patcher: any): void;
    revert?(): void;
}