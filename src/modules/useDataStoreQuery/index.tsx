import React, { useEffect } from "react";
import { graphqlOperation } from "../../utils/graphqlOperation";
import { LazyQueryTuple } from "./types";

export const useLazyQuery = <
  ResultType extends {},
  VariablesType extends {} = {}
  >(
  query: string
): LazyQueryTuple<ResultType> => {
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setErrors] = React.useState("");
  const [data, setData] = React.useState<any>([]);

  const [nextTokens, setNextTokens] = React.useState<any>([undefined]);

  const execute = async <ResultType extends {}, VariablesType extends {} = {}>(
    variables?: any
  ) => {
    try {
      await setLoading(true);

      const response: any = await graphqlOperation<ResultType, VariablesType>(
        query,
        variables
      );

      setData(response);

      if (response.errors) setErrors(response.errors);

      const token = response[variables?.name].nextToken;

      if (!token) return;

      checkNextPage(variables.page, variables, token);

    } catch (e) {
      setErrors(e);
    } finally {
      await setLoading(false);
    }
  };

  const checkNextPage = async (
    page: number,
    variables: any,
    token: string
  ) => {
    if (!token) return;

    const response: any = await graphqlOperation<ResultType, VariablesType>(
      query,
      { ...variables, nextToken: token }
    );

    if (
      variables &&
      response &&
      response[variables?.name] &&
      response[variables?.name]?.items.length > 0
    ){
      const shallow = nextTokens;

      const nextPage = page + 1;

      shallow[nextPage] = token;

      await setNextTokens([...shallow]);
      await setTotalPages(shallow.length);
    }
  };

  return [
    execute,
    {
      data,
      loading,
      error,
      nextTokens,
      setNextTokens,
      totalPages,
    },
  ];
};
