import { AxiosResponse } from 'axios';
import api from '@/api';

function signupUserService(params): Promise<AxiosResponse<any, any>> {
  return api.post('/auth/register', params);
}

export default signupUserService;
