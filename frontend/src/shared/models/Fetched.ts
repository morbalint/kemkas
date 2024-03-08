export type LoadingState = "not-started" | "loading" | "finished"

export interface Fetched<T> {
    data: T;
    state: LoadingState;
}