import { useQuery } from "./modules/useQuery";
import { useMutation } from "./modules/useMutation";
import { currentUser } from "./utils/currentUser";
import { graphqlOperation } from "./utils/graphqlOperation";
import { useSubscription } from "./modules/useSubscription";
import { AuthMode } from "./types/global";
import { useLazyQuery } from "./modules/useLazyQuery";
import { useLazySubscription } from "./modules/useLazySubscription";
import { usePaginatedQuery } from "./modules/usePaginatedQuery";
import { useDataStoreQuery } from "./modules/useDataStoreQuery";
import {
  useDataStoreDelete,
  useDataStoreSave,
} from "./modules/useDataStoreSave";

export {
  useQuery,
  useLazyQuery,
  usePaginatedQuery,
  useMutation,
  currentUser,
  graphqlOperation,
  useSubscription,
  useLazySubscription,
  useDataStoreQuery,
  useDataStoreDelete,
  useDataStoreSave,
  AuthMode,
};
