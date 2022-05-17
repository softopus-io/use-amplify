export type OperationVariables = Record<string, any>;
export type DefaultContext = Record<string, any>;

export interface BaseMutationOptions<
  TData = any,
> {
  notifyOnNetworkStatusChange?: boolean;
  onCompleted?: (data: TData) => void;
  onError?: (error: any) => void;
  ignoreResults?: boolean;
}
export interface MutationHookOptions<
  TData = any,
> extends BaseMutationOptions<TData> {
  mutation?: any;
}

export interface MutationFunctionOptions<
  TData = any,
> extends BaseMutationOptions<TData> {
  mutation?: any;
}

export interface FetchResult<
  TData = { [key: string]: any },
  C = Record<string, any>,
  E = Record<string, any>
> {
  data?: TData | null;
  extensions?: E;
  context?: C;
}

export interface MutationResult<TData = any> {
  data?: TData | null;
  error?: any;
  loading: boolean;
  called?: boolean;
}

export type MutationTuple<
  TData,
> = [(options?: any) => any, MutationResult<TData>];
