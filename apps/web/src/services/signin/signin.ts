import { AxiosResponse } from 'axios';
import api from '@/api';

function signinService(params): Promise<AxiosResponse<any, any>> {
  return api.post('/auth/authenticate', params);
}

export default signinService;
