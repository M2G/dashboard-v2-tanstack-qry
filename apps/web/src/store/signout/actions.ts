/* eslint-disable */
import { SignoutActionTypes } from './types';

function signoutUserAction(user: any) {
  return {
    type: SignoutActionTypes.SIGNOUT_USER_REQUEST,
    ...user,
  };
}

export { signoutUserAction };
