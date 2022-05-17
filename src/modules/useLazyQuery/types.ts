export interface QueryResult<TData = any> {
  data?: TData | null;
  error?: any;
  loading: boolean;
  called?: boolean;
  nextTokens: any;
  setNextTokens: React.Dispatch<React.SetStateAction<any>>;
  totalPages: number;
}

export type LazyQueryTuple<TData> = [
  (options?: any) => any,
  QueryResult<TData>
];
