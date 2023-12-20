import { AxiosResponse } from 'axios';
import api from '@/api';

function signupUserService(params): Promise<AxiosResponse> {
  return api.post('/auth/register', params);
}

export default signupUserService;
