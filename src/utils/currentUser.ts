import { Auth } from 'aws-amplify'

export const currentUser = async () => {
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (e) {
    console.log(e);
  }

  return user;
};
