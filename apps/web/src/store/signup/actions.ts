/* eslint-disable */
import { SignupActionTypes } from './types';

function signupUserAction(user: any) {
  return {
    type: SignupActionTypes.SIGNUP_USER_REQUEST,
    user,
  };
}

function signupUserSuccess(user?: any) {
  return {
    type: SignupActionTypes.SIGNUP_USER_SUCCESS,
    ...user,
  };
}

function signupUserError(user: any) {
  return {
    type: SignupActionTypes.SIGNUP_USER_ERROR,
    user,
  };
}

export { signupUserAction, signupUserSuccess, signupUserError };
