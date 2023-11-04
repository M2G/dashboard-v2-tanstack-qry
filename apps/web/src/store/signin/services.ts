import api from '@/api';

function signinService(params) {
  return api.post('/auth/authenticate', params);
}

export default signinService;
