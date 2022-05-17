
# use-amplify

> React Hooks for Amplify DataStore and GraphQL API.

[![NPM](https://img.shields.io/npm/v/use-amplify.svg)](https://www.npmjs.com/package/use-amplify) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add use-amplify
```
or
```bash
npm install --save use-amplify
```


## 1. DataStore hooks


### useDataStoreQuery
is useful for manual query execution using DataStore.

```tsx
import { useDataStoreQuery } from "use-amplify";
import {Company} from "src/models";

export const Companies = () => {
  const [query, { loading, data, error }] = useDataStoreQuery(Company)

  useEffect(()=>{
    query();
  },[]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error! {error}</div>
  }

  return (
    <div>
      {data?.items((item: Company, index: number) => {
        <div key={index}>{item?.name}</div>
      })}
    </div>
  );
}
```

### useDataStoreSave
is useful for saving and updating records using DataStore.

```tsx
import { useDataStoreQuery } from "use-amplify";
import {Company} from "src/models";

export const CompanyProfile = () => {
  const [save, { loading, data, error }] = useDataStoreSave(Company)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateEmailNewsletterInput>({
    defaultValues: useMemo(() => {
      return {
        email: "",
      };
    }, []),
  });

  const onSubmit = handleSubmit(async (data: CreateEmailNewsletterInput) => {
    await save(new Company({name: "OASA s.r.o."}));
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        {...register("email", { required: true })}
      />
      <button type={"submit"}>submit</button>
    </form>
  );
}
```

### useDataStoreDelete
is useful for deleting record using DataStore.

```tsx
import { useDataStoreDelete } from "use-amplify";
import {Company} from "src/models";

export const CompanyProfile = () => {
  const [remove, { loading, data, error }] = useDataStoreDelete(Company)

  const removeCompany = async (id: string) => {
    await remove(id);
  };

  return (
      <button onClick={()=>removeCompany("1")}>remove</button>
  );
}
```


## GraphQL API hooks

### useQuery
automatically executes the corresponding GraphQL query string.

```tsx
import { useQuery } from "use-amplify";
import {
  ListCompaniesQuery,
  Company
} from "src/API";
import { listCompanies } from "src/graphql/queries";

export const Companies = () => {
  const { loading, data, error } = useQuery<ListCompaniesQuery>(listCompanies)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error! {error}</div>
  }

  return (
    <div>
      {data?.listCompanies?.items((item: Company, index: number) => {
        <div key={index}>{item?.name}</div>
      })}
    </div>
  );
}
```

### useLazyQuery
is useful for manual query execution.

```tsx
import { useEffect } from "React";
import { useLazyQuery } from "use-amplify";
import {
  ListCompaniesQuery,
  Company
} from "src/API";
import { listCompanies } from "src/graphql/queries";

export const Companies = () => {
  const [query, { loading, data, error }] = useLazyQuery<ListCompaniesQuery>(listCompanies)

  useEffect(()=>{
    query();
  },[]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error! {error}</div>
  }

  return (
    <div>
      {data?.listCompanies?.items((item: Company, index: number) => {
        <div key={index}>{item?.name}</div>
      })}
    </div>
  );
}
```

### useMutation
is useful for executing mutations.

```tsx

import { useForm } from "react-hook-form";
import {
  CreateEmailNewsletterInput,
  CreateEmailNewsletterMutation,
} from "src/API";
import { useMemo } from "react";
import { createEmailNewsletter } from "src/graphql/mutations";
import { useMutation } from "@oasa/amplify-query";

export const Newsletter = () => {

  const [registerNewsletter] = useMutation<
    CreateEmailNewsletterInput,
    CreateEmailNewsletterMutation
    >(createEmailNewsletter);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateEmailNewsletterInput>({
    defaultValues: useMemo(() => {
      return {
        email: "",
      };
    }, []),
  });

  const onSubmit = handleSubmit(async (data: CreateEmailNewsletterInput) => {
    await registerNewsletter({
      input: data,
    });
  });

  return (
    <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("email", { required: true })}
        />
        <button type={"submit"}>submit</button>
    </form>
  );
}
```


### useSubscription
enabling the server to push updates to the subscription's result.
```tsx
import React, { useState } from "react";
import { useQuery } from "@oasa/amplify-query";
import {
  CompaniesByCreatedAtQuery,
  EntityType,
  ModelSortDirection,
  Company
} from "src/API";
import { companiesByCreatedAt } from "src/graphql/queries";

export const CompanyProfile = () => {

  const {data, loading, error} = useSubscription(
    onUpdateCompany,
    {},
    {
      withOwner: true,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      onSubscriptionData: (data: OnUpdateCompanySubscription) => {
        console.log(data);
      },
    }
  );

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error! {error}</div>
  }

  return (
    <div>
      {data?.onUpdateCompany?.name}
    </div>
  );
}
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table cellspacing="0" cellpadding="1"><tr><td><a href="https://github.com/pecha.richard"><img src="https://avatars.githubusercontent.com/u/76245185?v=4" width="100px;" height="100px;" alt="Richard Pecha"/><br /><sub><b>Richard Pecha</b></sub></a><br /><a href="https://github.com/OASA-ai/amplify-query/commits?author=pecha.richard" title="Code">💻</a> <a href="https://github.com/OASA-ai/amplify-query/commits?author=pecha.richard" title="Tests">⚠️</a></td></tr></table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [Richard Pecha](https://github.com/Richard Pecha)
