export type OperationVariables = Record<string, any>;

export interface BaseSubscriptionOptions<TData = any> {
  notifyOnNetworkStatusChange?: boolean;
  onError?: (error: any) => void;
  ignoreResults?: boolean;
}

export interface SubscriptionHookOptions<TData = any>
  extends BaseSubscriptionOptions<TData> {
  onSubscriptionData?: (data: TData) => any;
  authMode: any;
  withOwner: boolean;
}

export type UseSubscriptionType<ResultType> = {
  loading: boolean;
  error: any;
  data: ResultType | null;
};
