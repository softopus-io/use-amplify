import React from "react";
import { useEffect } from "react";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import { UseQueryType } from "./types";
import { graphqlOperation } from "../../utils/graphqlOperation";

export const usePaginatedQuery = <
  ResultType extends {},
  VariablesType extends {} = {}
  >(
  query: string,
  variables?: any
): UseQueryType<ResultType> => {
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState("");
  const [data, setData] = React.useState<any>([]);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  const [nextTokens, setNextTokens] = React.useState<any>([undefined]);
  const [page, setPage] = React.useState<number>(0);
  const [nextToken, setNextToken] = React.useState<string | undefined | number>(
    undefined
  );

  const fetchQuery = async (query: string, variables?: any) => {
    try {
      setLoading(true);

      const response: any = await graphqlOperation<ResultType, VariablesType>(
        query,
        { ...variables, nextToken }
      );

      setData(response);

      if (response.errors) setErrors(response.errors);

      const token = response[variables?.name].nextToken;

      if (!token) return;

      checkNextPage(page, token);
    } catch (e) {
      setErrors(e);
    } finally {
      await setLoading(false);
    }
  };

  const checkNextPage = async (page: number, token: string) => {
    if (!token) return;

    const response: any = await graphqlOperation<ResultType, VariablesType>(
      query,
      { ...variables, nextToken: token }
    );
    if (
      response &&
      response[variables.name] &&
      response[variables.name]?.items.length > 0
    ) {
      const shallow = nextTokens;

      const nextPage = page + 1;

      shallow[nextPage] = token;
      setNextTokens([...shallow]);
      setTotalPages(shallow.length);
    }
  };

  const refetch = async () => {
    if (!query) return;

    try {
      setLoading(true);

      const response: any = await graphqlOperation<ResultType, VariablesType>(
        query,
        { ...variables, nextToken }
      );

      setData(response);

      if (response.errors) setErrors(response.errors);
    } catch (e) {
      setErrors(e);
    } finally {
      await setLoading(false);
    }
  };

  useDeepCompareEffectNoCheck(() => {
    if (query) fetchQuery(query, variables);
  }, [query, variables, nextToken]);

  useEffect(() => {
    if (page === 0) {
      setNextToken(undefined);
      return;
    }
    setNextToken(nextTokens[page]);
  }, [page]);

  return {
    loading,
    data,
    errors,
    refetch,
    nextTokens,
    setNextTokens,
    nextToken,
    setNextToken,
    totalPages,
    page,
    setPage,
  };
};
