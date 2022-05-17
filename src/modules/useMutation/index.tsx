import React from "react";
import {
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
} from "./types";
import { graphqlOperation } from "../../utils/graphqlOperation";

export const useMutation = <
  TInputData extends {},
  TResponseData = any | null,
  TVariables = OperationVariables,
  TContext = any,
  TCache = any
  >
(
  mutation: any,
  options?: MutationHookOptions<TInputData>
): MutationTuple<TResponseData>  => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>("");
  const [data, setData] = React.useState<TResponseData | null>(null);

  const mutate = async <ResultType extends {}, VariablesType extends {} = {}>(
    variables?: VariablesType
  ) => {
    await setLoading(true);
    const result:any = await graphqlOperation(mutation, variables);
    await setError(result.error);
    await setData(result as TResponseData);
    await setLoading(false);
    return result;
  };

  return [
    mutate,
    {
      data,
      loading,
      error,
    },
  ];
};
