import Mocks from 'mockjs';
import { Res, Routes } from '@/utils/interface';

const tipList = [
  {
    id: 0,
    title: '冬',
    content: '农历正月初五',
  },
  {
    id: 1,
    title: '每日计划',
    content: '每日计划',
  },
  {
    id: 2,
    title: '明日安排',
    content: '明日安排',
  },
  {
    id: 3,
    title: '会议总结',
    content: '会议议题。出现了什么问题;信息分享',
  },
  {
    id: 4,
    title: '电影清单',
    content: '电影',
  },
  {
    id: 5,
    title: '歌曲收藏',
    content: '无感',
  },
  {
    id: 6,
    title: '路程',
    content: '路程',
  },
  {
    id: 7,
    title: '联系电话',
    content: '2343242342342343',
  },
  {
    id: 8,
    title: '邮箱',
    content: '24534534534@qq.com',
  },
];

const routesList = [
  {
    path: '/',
    name: 'home',
    component: 'Layout',
    redirect: '',
    hidden: false,
    meta: null,
    id: '1',
    parentId: null,
  },
  {
    path: '/menu1',
    name: 'menu1',
    component: 'Layout',
    redirect: '',
    hidden: false,
    meta: null,
    id: '2',
    parentId: null,
  },
  {
    path: 'menu1_1',
    name: 'menu1_1',
    component: 'Menu_1_1',
    redirect: '',
    hidden: false,
    meta: null,
    id: '3',
    parentId: '2',
  },
  {
    path: '/menu2',
    name: 'menu2',
    component: 'Layout',
    redirect: '',
    hidden: false,
    meta: null,
    id: '4',
    parentId: null,
  },
  {
    path: '',
    name: 'menu2',
    component: 'Menu2',
    redirect: '',
    hidden: false,
    meta: null,
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

// 获取所有便签
const article = Mocks.mock('/home/article', () => {
  return tipList;
});

// 搜索便签
const selectA = Mocks.mock('/home/selectArticle', (ops: any) => {
  const obj = eval('(' + ops.body + ')');
  const list: any[] = [];
  tipList.filter((item) => {
    if (item.title.indexOf(obj.val) >= 0) {
      list.push(item);
    }
  });
  return list;
});

// 获取便签详情
const details = Mocks.mock('/getDetail', (ops: any) => {
  const obj = eval('(' + ops.body + ')');
  for (let i = 0; i < tipList.length; i++) {
    if (tipList[i].id == obj.id) {
      return tipList[i];
    }
  }
});
// 修改便签内容
const fex = Mocks.mock('/api/updateTip', (ops: any) => {
  const obj = eval('(' + ops.body + ')');
  tipList[obj.data.id].title = obj.data.title;
  tipList[obj.data.id].content = obj.data.content;
});
// 删除便签
const del = Mocks.mock('/api/deleteTip', (ops: any) => {
  const obj = eval('(' + ops.body + ')');
  for (let i = 0; i < tipList.length; i++) {
    if (tipList[i].id == obj.id) {
      tipList.splice(i, 1);
    }
  }
});
// 新增便签
const add = Mocks.mock('/api/addTip', (ops: any) => {
  const obj = eval('(' + ops.body + ')');
  obj.data.id = tipList.length;
  tipList.push(obj.data);
});

// 返回模拟的数据及接口：
export default (router: any) => {
  return [
    router.get('/api/routes', routes),
    router.get('/api/article', article),
    router.get('/home/selectArticle', selectA),
    router.get('/api/getDetail', details),
    router.post('/api/updateTip', fex),
    router.delete('/api/deleteTip', del),
    router.put('/api/addTip', add),
  ];
};
