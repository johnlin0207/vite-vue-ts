import axios from '@/utils/request';

interface Params {
  username: string;
  pwd: string;
}

// 登录
export function login(params: Params) {
  return axios.get('/api/login', {
    data: { username: params.username, pwd: params.pwd },
  });
}
