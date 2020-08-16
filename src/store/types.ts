export interface Mutations<S> {
  [p: string]: (state: S, payload: any) => void;
}

export type Commit<S, M extends Mutations<S>> = <T extends keyof M>(
  mutation: T,
  params: Parameters<M[T]>[1]
) => void;

export interface Ctx<S, M extends Mutations<S>> {
  commit: Commit<S, M>;
  state: S;
}

export interface Actions<S, M extends Mutations<S>> {
  [p: string]: (ctx: Ctx<S, M>, payload: any) => void | Promise<void>;
}

export interface Module<S, M extends Mutations<S>, A extends Actions<S, M>> {
  namespaced: boolean;
  state: S;
  mutations: M;
  actions: A;
}
