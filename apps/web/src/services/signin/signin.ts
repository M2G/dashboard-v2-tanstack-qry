import { AxiosResponse } from 'axios';
import api from '@/api';
import { ISignin } from '@/types/types';

function signinService(params: ISignin): Promise<AxiosResponse> {
  return api.post('/auth/authenticate', params);
}

export default signinService;
