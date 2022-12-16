import axios from '@/utils/request';
import { Res } from '@/utils/interface';

// 请求权限路由
export function getRoutes(userId: string): Promise<Res> {
  return axios.get('/api/routes', { data: userId });
}

export function getTables(): Promise<Res> {
  return axios.get('/api/tableData');
}

export function getUserInfo(userId: string): Promise<Res> {
  return axios.get('/api/getUserInfo', { data: userId });
}
