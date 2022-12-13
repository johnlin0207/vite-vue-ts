import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import NotFound from '@/views/404.vue';
import About from '@/views/About.vue';
import { getRoutes } from '@/api/home';
import { isSuccess } from '@/utils/util';
import { Routes } from '@/utils/interface';
import { request } from '@/utils/constant';
import { ElMessage } from 'element-plus';
import { RouteRecordRaw } from 'vue-router';
import { useRouterStore } from '@/store/router';
import pinia from '@/pinia';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const store = useRouterStore(pinia);
const constantRoute = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: { title: '404' },
  },
];

const whiteList = ['/login', '/404'];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
});

const loadViewComponent = (component: string | any) => () =>
  import(`@/views/${component}.vue`);

// 扁平结构菜单转换为嵌套结构
const convert = (plainList: Routes[]): Routes[] => {
  const nestedList: Routes[] = [];
  // 找出最外层
  for (const item of plainList) {
    if (!item.parentId) {
      nestedList.push(item);
    }
  }

  const loop = (list: Routes[]) => {
    // 对每个最外层的节点找孩子
    for (const item of list) {
      // 在原始数组中找
      for (const iterator of plainList) {
        if (iterator.parentId === item.id) {
          item.children
            ? item.children.push(iterator)
            : (item.children = [iterator]);
        }
      }
      if (item.children) {
        loop(item.children);
      }
    }
  };

  loop(nestedList);
  return nestedList;
};

const fetchMenu = async (): Promise<Routes[]> => {
  const userId = localStorage.getItem('userId') || '';
  const resData = await getRoutes(userId);
  if (isSuccess(resData)) {
    const {
      data: { routes = [] },
    } = resData;
    const nestedRouteList = convert(routes);
    return nestedRouteList;
  } else {
    ElMessage.error(resData.msg || request.fail);
    return [];
  }
};

// 递归给每一级加载component
const loadComponent = (routes: Routes[]) => {
  routes.forEach((route: Routes) => {
    route.component = loadViewComponent(route.component);
    if (Array.isArray(route.children)) {
      loadComponent(route.children);
    }
  });
  return routes as RouteRecordRaw[];
};

const dynamicAddRoute = async () => {
  // 请求
  const routes = await fetchMenu();
  store.set(routes);
  // 加载component
  const RecordRawRoutes = loadComponent(routes);
  RecordRawRoutes.forEach((route: any) => {
    router.addRoute({
      path: route.path,
      name: route.name,
      component: route.component,
      children: route.children,
    });
  });
  // 最后添加404的捕获
  router.addRoute({
    path: '/:catchAll(.*)',
    redirect: '/404',
  });
};

router.beforeEach(async (to, from, next) => {
  // 判断是否已经登录
  const token = localStorage.getItem('token');
  const { stateRouter } = store;
  // 白名单放行
  if (whiteList.includes(to.fullPath)) {
    next();
  } else if (token) {
    if (stateRouter) {
      NProgress.done();
      next();
    } else {
      // 重新设置权限路由
      await dynamicAddRoute();
      NProgress.done();
      next(to);
    }
  } else {
    NProgress.done();
    // 未登录跳转需要鉴权页面先跳登录
    if (to.fullPath !== '/login') {
      next({
        path: '/login',
        params: { redirect: encodeURIComponent(to.fullPath) },
      });
    } else {
      next();
    }
  }
});

export default router;
