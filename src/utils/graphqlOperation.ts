import { currentUser } from "./currentUser";
import { API } from "aws-amplify";

export const graphqlOperation = async <
  ResultType extends {},
  VariablesType extends {} = {}
>(
  query: string,
  variables?: VariablesType
) => {
  const user = await currentUser();

  const authMode = (variables as any)?.authMode
    ? (variables as any)?.authMode
    : user
    ? "AMAZON_COGNITO_USER_POOLS"
    : "AWS_IAM";

  const { data } = (await API.graphql({
    query: query,
    authMode,
    variables,
  })) as any;

  return data;
};
