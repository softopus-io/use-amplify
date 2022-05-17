import _ from "lodash";
import React from "react";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import { graphqlOperation } from "../../utils/graphqlOperation";
import { UseQueryType } from "./types";

export const useQuery = <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType
): UseQueryType<ResultType> => {
  const [loading, setLoading] = React.useState(true);
  const [mutationLoading, setMutationLoading] = React.useState(false);
  const [error,] = React.useState("");
  const [data, setData] = React.useState<any>([]);
  const [nextToken, setNextToken] = React.useState<any>([]);

  const mutation = async <ResultType extends {}, VariablesType extends {} = {}>(
    query: string,
    variables?: VariablesType
  ) => {
    let data = null;
    try {
      await setMutationLoading(true);
      data = await graphqlOperation<ResultType, VariablesType>(
        query,
        variables
      );
      await setMutationLoading(false);
      return data;
    } catch (e) {
      console.log(e);
      await setMutationLoading(false);
      data = e;
    }

    return data;
  };

  const fetchQuery = async (
    query: string,
    variables?: any,
    concat?: boolean
  ) => {
    setLoading(true);

    const newData: any = await graphqlOperation<ResultType, VariablesType>(
      query,
      variables
    );

    if (variables && variables?.nextToken && concat) {
      const node = _.get(data, variables.name);
      setData({
        [variables.name]: {
          items: (node?.items || [])?.concat(newData[variables.name]?.items),
          nextToken: newData[variables.name]?.nextToken,
        },
      });
    } else {
      setData(newData);
    }
    setLoading(false);
    // setError(error);
  };

  const refetch = () => {
    if (query) fetchQuery(query, variables, false);
  };

  useDeepCompareEffectNoCheck(() => {
    if (query) fetchQuery(query, variables, true);
  }, [query, variables]);

  return {
    loading,
    data,
    error,
    refetch,
    mutation,
    mutationLoading,
  };
};
