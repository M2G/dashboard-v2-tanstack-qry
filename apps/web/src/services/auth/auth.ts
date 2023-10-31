import api from '@/api';

function forgotPasswordService(params: any): Promise<any> {
  return api.post('/auth/forgot-password', params);
}

function recoverPasswordService(params: any): Promise<any> {
  return api.post('/auth/reset-password', params);
}

function userProfilService(id: string): Promise<any> {
  return api.get(`/auth/users/${id}`);
}

function createUserProfilService(params: any): Promise<any> {
  return api.post(`/users`, params);
}

function updateUserProfilService({ id, ...params }: any): Promise<any> {
  return api.put(`/auth/users/${id}`, params);
}

function getUsersService({ filters, page, pageSize }): Promise<any> {
  return api.get(
    `/auth/users${
      filters
        ? `?filters=${filters}&page=${page}&pageSize=${pageSize}`
        : `?page=${page}&pageSize=${pageSize}`
    }`,
  );
}

function deleteUsersService(id: string): Promise<any> {
  return api.delete(`/auth/users/${id}`);
}

export {
  forgotPasswordService,
  recoverPasswordService,
  getUsersService,
  createUserProfilService,
  userProfilService,
  updateUserProfilService,
  deleteUsersService,
};
