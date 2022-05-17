import { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import { LazySubscriptionTuple, SubscriptionHookOptions } from "./types";

export const useLazySubscription = <TResponseData extends {},
  VariablesType extends {} = {}>(
  query: string,

): LazySubscriptionTuple<TResponseData> => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TResponseData | null>(null);
  let subscription: any = null;

  const execute = async <ResultType extends {}, VariablesType extends {} = {}>(
    variables?: VariablesType,
    options?: SubscriptionHookOptions<TResponseData>
  ) => {
    const user = await Auth.currentAuthenticatedUser();

    const authMode = (options as any)?.authMode
      ? (options as any)?.authMode
      : user
        ? "AMAZON_COGNITO_USER_POOLS"
        : "AWS_IAM";

    const queryVariables =
      user && options?.withOwner
        ? { ...variables, owner: user?.username }
        : variables;

    subscription = (
      API.graphql({
        authMode: authMode,
        query: query,
        variables: queryVariables
      }) as any
    ).subscribe({
      next(payload: any) {
        setLoading(true);
        const data = payload.value?.data;
        setData(data);
        options?.onSubscriptionData &&
        data &&
        options?.onSubscriptionData(data);
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    return () => {
      subscription && subscription?.unsubscribe();
    };
  }, []);

  return [
    execute,
    {
      data,
      loading,
      error
    }
  ];
};
