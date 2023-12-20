import api from '@/api';

import { ICreateUser, IUser } from '@/types';
import { AxiosResponse } from 'axios';

function forgotPasswordService(params: string): Promise<AxiosResponse> {
  return api.post('/auth/forgot-password', params);
}

function recoverPasswordService(params: string): Promise<AxiosResponse> {
  return api.post('/auth/reset-password', params);
}

function userProfilService({ id }: { id: string }): Promise<AxiosResponse> {
  return api.get(`/auth/users/${id}`);
}

function createUserProfilService(params: ICreateUser): Promise<AxiosResponse> {
  // return api.post(`/users`, params);
  // TODO
  return api.post('/auth/register', params);
}

function updateUserProfilService({
  id,
  ...params
}: IUser): Promise<AxiosResponse> {
  return api.put(`/auth/users/${id}`, params);
}

function getUsersService({
  filters,
  page,
  pageSize,
}: {
  filters: string;
  page: number;
  pageSize: number;
}): Promise<AxiosResponse> {
  return api.get(
    `/auth/users${
      filters
        ? `?filters=${filters}&page=${page}&pageSize=${pageSize}`
        : `?page=${page}&pageSize=${pageSize}`
    }`,
  );
}

function deleteUsersService({ id }: { id: string }): Promise<any> {
  return api.delete(`/auth/users/${id}`);
}

export {
  createUserProfilService,
  deleteUsersService,
  forgotPasswordService,
  getUsersService,
  recoverPasswordService,
  updateUserProfilService,
  userProfilService,
};
