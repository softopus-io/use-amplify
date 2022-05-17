export type UseQueryType<ResultType> = {
  loading: boolean;
  errors: any;
  nextTokens: any;
  nextToken: any;
  setNextToken: React.Dispatch<
    React.SetStateAction<string | number | undefined>
    >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  page: number;
  data: ResultType;
  refetch: () => void;
  setNextTokens: React.Dispatch<React.SetStateAction<any>>;
};
