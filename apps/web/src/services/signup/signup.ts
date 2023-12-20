import { AxiosResponse } from 'axios';
import api from '@/api';
import { ISignup } from '@/types/types';

function signupUserService(params: ISignup): Promise<AxiosResponse> {
  return api.post('/auth/register', params);
}

export default signupUserService;
