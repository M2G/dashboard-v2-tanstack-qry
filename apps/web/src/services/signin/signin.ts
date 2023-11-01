import { AxiosResponse } from 'axios';
import api from '@/api';

function signinService(params): Promise<AxiosResponse<any, any>> {
  console.log('params params params', params);
  return api.post('/auth/authenticate', params);
}

export default signinService;
