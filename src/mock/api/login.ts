import Mocks from 'mockjs';
import { Res } from '@/utils/interface';

// 登录
const login = Mocks.mock('/api/login', (ops: any): Res => {
  return {
    status: '0',
    msg: '',
    data: {
      token: 'token123',
      userId: 'userId123',
    },
  };
});

// 返回模拟的数据及接口：
export default (router: any) => {
  return [router.get('/api/login', login)];
};
