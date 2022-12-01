import axios from '@/utils/request';
import { Res } from '@/utils/interface';

// 请求权限路由
export function getRoutes(userId: string): Promise<Res> {
  return axios.get('/api/routes', { data: userId });
}

export function getArticles() {
  return axios.get('/home/article'); // mockjs返回的接口
}

// 搜索便签
export function selectA(val: string) {
  return axios.get('/home/selectArticle', { data: val });
}

// 详情
export function getDetail(id: object) {
  return axios.get('/getDetail', { data: id });
}

// 修改便签
export function fex(data: object) {
  return axios.post('/api/updateTip', { data: data });
}

// 删除便签
export function del(id: string) {
  return axios.delete('/api/deleteTip', { data: id });
}

// 新增便签
export function add(data: object) {
  return axios.put('/api/addTip', { data: data });
}
