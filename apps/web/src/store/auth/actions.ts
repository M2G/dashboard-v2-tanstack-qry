import { AuthActionTypes } from './types';

export const authCreateUserProfilAction = (data: any) => ({
  data,
  type: AuthActionTypes.AUTH_CREATE_USER_PROFIL_REQUEST,
});

export const authUpdateUserProfilAction = (data: any) => ({
  data,
  type: AuthActionTypes.AUTH_UPDATE_USER_PROFIL_REQUEST,
});

export const authDeleteUserProfilAction = ({
  id,
}: {
  id: number;
}): { id: number; type: AuthActionTypes } => ({
  id,
  type: AuthActionTypes.AUTH_DELETE_USER_PROFIL_REQUEST,
});

export const authDeleteUserProfilSuccess = (): { type: AuthActionTypes } => ({
  type: AuthActionTypes.AUTH_DELETE_USER_PROFIL_SUCCESS,
});

export const authDeleteUserProfilError = (errors: any) => ({
  errors,
  type: AuthActionTypes.AUTH_DELETE_USER_PROFIL_ERROR,
});

export const authGetUserProfilErrorAction = (data: any) => ({
  data,
  type: AuthActionTypes.AUTH_GET_USER_PROFIL_REQUEST,
});

export const authGetUserProfilAction = (args?: any) => ({
  type: AuthActionTypes.AUTH_GET_USER_PROFIL_REQUEST,
  ...args,
});

export const authGetUsersProfilAction = (args?: any) => ({
  type: AuthActionTypes.AUTH_GET_USERS_PROFIL_REQUEST,
  ...args,
});

export const authUpdatePasswordAction = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_UPDATE_PASSWORD_REQUEST,
  };
};

export const authRecoverPasswordAction = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_RECOVER_PASSWORD_REQUEST,
  };
};

export const authForgotPasswordAction = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_FORGOT_PASSWORD_REQUEST,
  };
};

export const authForgotPasswordError = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_FORGOT_PASSWORD_ERROR,
  };
};

export const authUpdateUserProfilSuccess = () => ({
  type: AuthActionTypes.AUTH_UPDATE_USER_PROFIL_SUCCESS,
});

export const authUpdateUserProfilError = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_UPDATE_USER_PROFIL_ERROR,
  };
};

export const authGetUsersProfilSuccess = ({ data, ...args }: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_GET_USERS_PROFIL_SUCCESS,
    ...args,
  };
};

export const authGetUserProfilSuccess = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_GET_USER_PROFIL_SUCCESS,
  };
};

export const authGetUserProfilError = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_GET_USER_PROFIL_ERROR,
  };
};

export const authGetUsersProfilError = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_GET_USERS_PROFIL_ERROR,
  };
};

export const authUpdatePasswordSuccess = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_UPDATE_PASSWORD_SUCCESS,
  };
};

export const authRecoverPasswordSuccess = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_RECOVER_PASSWORD_SUCCESS,
  };
};

export const authRecoverPasswordError = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_RECOVER_PASSWORD_ERROR,
  };
};

export const authForgotPasswordSuccess = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_FORGOT_PASSWORD_SUCCESS,
  };
};

export const authRequestErrorAction = (data: any) => {
  return {
    data,
    type: AuthActionTypes.AUTH_REQUEST_ERROR,
  };
};
