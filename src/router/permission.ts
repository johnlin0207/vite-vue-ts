import router from '@/router';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useRouterStore } from '@/store/router';
import { getUserInfo, getRoutes } from '@/api/home';
import pinia from '@/pinia';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Routes } from '@/utils/interface';
import { isSuccess, get } from '@/utils/util';
import { ElMessage } from 'element-plus';
import { REQUEST } from '@/utils/constant';

const userStore = useUserStore(pinia);
const routerStore = useRouterStore(pinia);
const whiteList = ['/login', '/404', '/about'];
const loadViewComponent = (component: string | any) => () =>
  import(`@/views/${component}.vue`);

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

// 请求用户信息
const fetchUserInfo = async () => {
  const userId = localStorage.getItem('userId') || '';
  const userInfo = await getUserInfo(userId);
  if (isSuccess(userInfo)) {
    const data = userInfo.data;
    userStore.set(data);
    return data;
  }
  return { roles: [] };
};

const hasPermission = (routeRoles: string) => {
  const { userInfo } = userStore;
  const roles: string[] = userInfo.roles;
  if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (!routeRoles) return true;
  var a = roles.some((role) => routeRoles === role);
  return a;
};

// 扁平结构菜单转换为嵌套结构
const convert = (plainList: Routes[]): Routes[] => {
  const nestedList: Routes[] = [];
  // 找出最外层
  for (const item of plainList) {
    if (!item.parentId && hasPermission(get(item, 'meta.roles'))) {
      nestedList.push(item);
    }
  }
  const loop = (list: Routes[]) => {
    // 对每个最外层的节点找孩子
    for (const item of list) {
      // 在原始数组中找
      for (const iterator of plainList) {
        if (
          iterator.parentId === item.id &&
          hasPermission(get(iterator, 'meta.roles'))
        ) {
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
    ElMessage.error(resData.msg || REQUEST.FAIL);
    return [];
  }
};

// 请求用户权限路由并动态加载
const dynamicAddRoute = async () => {
  const routes = await fetchMenu();
  routerStore.set(routes);
  // 加载component
  const RecordRawRoutes = loadComponent(routes);
  RecordRawRoutes.forEach((route: any) => {
    router.addRoute({
      path: route.path,
      name: route.name,
      component: route.component,
      children: route.children,
      meta: route.meta,
    });
  });
};

router.beforeEach(async (to, from, next) => {
  // 判断是否已经登录
  const token = localStorage.getItem('token');
  const { stateRouter } = routerStore;
  // 白名单放行
  if (whiteList.includes(to.fullPath)) {
    next();
  } else if (token) {
    if (stateRouter && stateRouter.length > 0) {
      next();
    } else {
      await fetchUserInfo();
      await dynamicAddRoute();
      // 最后添加404的捕获
      router.addRoute({
        path: '/:catchAll(.*)',
        redirect: '/404',
      });
      next(to);
    }
    NProgress.done();
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
