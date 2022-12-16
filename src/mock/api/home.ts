import Mocks from 'mockjs';
import { Res, Routes } from '@/utils/interface';

const routesList = [
  {
    path: '/menu1',
    name: 'menu1',
    component: 'Layout',
    redirect: '',
    hidden: false,
    meta: {
      roles: 'guest',
    },
    id: '2',
    parentId: null,
  },
  {
    path: 'menu1_1',
    name: 'menu1_1',
    component: 'Menu_1_1',
    redirect: '',
    hidden: false,
    meta: {
      roles: '123',
    },
    id: '3',
    parentId: '2',
  },
  {
    path: '/menu2',
    name: 'menu2',
    component: 'Layout',
    redirect: '',
    hidden: false,
    meta: {
      roles: '',
    },
    id: '4',
    parentId: null,
  },
  {
    path: '',
    name: 'menu2',
    component: 'Menu2',
    redirect: '',
    hidden: false,
    meta: {
      roles: 'asd',
    },
    id: '5',
    parentId: '4',
  },
];

// 请求权限路由
const routes = Mocks.mock('/api/routes', (): Res => {
  return {
    status: '0',
    msg: '',
    data: {
      routes: routesList,
    },
  };
});

const tableData = Mocks.mock('/api/tableData', (): Res => {
  return {
    status: '0',
    msg: '',
    data: [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
  };
});

// 获取用户权限
const userInfo = Mocks.mock('/api/getUserInfo', (ops: any) => {
  return {
    status: '0',
    msg: '',
    data: {
      roles: ['guest'],
    },
  };
});

// 返回模拟的数据及接口：
export default (router: any) => {
  return [
    router.get('/api/routes', routes),
    router.get('/api/tableData', tableData),
    router.get('/api/getUserInfo', userInfo),
  ];
};
