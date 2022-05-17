export type UseQueryType<ResultType> = {
  loading: boolean;
  mutationLoading: boolean;
  error: any;
  data: ResultType;
  refetch: () => void;
  mutation: (query: string, variables?: any) => Promise<any>;
};
