import { useState } from "react";
import { DataStore } from "aws-amplify";

export interface QueryResult<TData = any> {
  data?: TData | null;
  error?: any;
  loading: boolean;
}

export type LazyQueryTuple<TData> = [
  (predicates?: any, pagination?: any) => any,
  QueryResult<TData>
];

export const useDataStoreQuery = <
  ResultType extends {},
  VariablesType extends {} = {}
>(
  entity: any
): LazyQueryTuple<ResultType> => {
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState("");
  const [data, setData] = useState<any>([]);

  const execute = async <ResultType extends {}, VariablesType extends {} = {}>(
    query?: any,
    pagination?: any
  ) => {
    let response: any = null;
    try {
      setLoading(true);

      response = await DataStore.query(entity, query, pagination);

      setData(response);

      if (response.errors) setErrors(response.errors);
    } catch (e) {
      setErrors(e);
    } finally {
      setLoading(false);
    }

    return response;
  };

  return [
    execute,
    {
      data,
      loading,
      error,
    },
  ];
};
