import { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import { SubscriptionHookOptions, UseSubscriptionType } from "./types";

export const useSubscription = <
  TResponseData extends {},
  VariablesType extends {} = {}
  >(
  query: string,
  variables?: VariablesType,
  options?: SubscriptionHookOptions<TResponseData>
): UseSubscriptionType<TResponseData> => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TResponseData | null>(null);

  useEffect(() => {
    let subscription: any = null;

    const setUpSubscription = async () => {
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
          variables: queryVariables,
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
        },
      });
    };
    setUpSubscription();
    return () => {
      subscription && subscription?.unsubscribe();
    };
  }, [variables]);

  return {
    loading,
    data,
    error,
  };
};
