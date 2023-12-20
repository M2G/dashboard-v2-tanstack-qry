import { AxiosResponse } from 'axios';

import api from '@/api';

function forgotPasswordService(params: any): Promise<AxiosResponse> {
  return api.post('/auth/forgot-password', params);
}

function recoverPasswordService(params: any): Promise<AxiosResponse> {
  return api.post('/auth/reset-password', params);
}

function userProfilService({ id }: { id: string }): Promise<AxiosResponse> {
  return api.get(`/auth/users/${id}`);
}

function createUserProfilService(params: any): Promise<AxiosResponse> {
  // return api.post(`/users`, params);
  // TODO
  return api.post('/auth/register', params);
}

function updateUserProfilService({
  id,
  ...params
}: any): Promise<AxiosResponse> {
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
}): Promise<any> {
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
