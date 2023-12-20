import { AxiosResponse } from 'axios';
import api from '@/api';

function signinService(params: any): Promise<AxiosResponse> {
  return api.post('/auth/authenticate', params);
}

export default signinService;
