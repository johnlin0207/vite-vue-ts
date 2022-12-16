import router from '@/router';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store/user';
import { getUserInfo, getRoutes } from '@/api/home';
import pinia from '@/pinia';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Routes } from '@/utils/interface';
import { isSuccess } from '@/utils/util';
import { ElMessage } from 'element-plus';
import { REQUEST } from '@/utils/constant';

const userStore = useUserStore(pinia);
const whiteList = ['/login', '/404'];
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
  let localRoutes = JSON.parse(localStorage.getItem('localRoutes') || 'null');
  if (!localRoutes) {
    const resData = await getRoutes(userId);
    const {
      data: { routes = [] },
    } = resData;
    if (!isSuccess(resData)) {
      ElMessage.error(resData.msg || REQUEST.FAIL);
      return [];
    }
    localStorage.setItem('localRoutes', JSON.stringify(routes));
    localRoutes = routes;
  }
  const nestedRouteList = convert(localRoutes);
  return nestedRouteList;
};

const dynamicAddRoute = async () => {
  // 请求
  const routes = await fetchMenu();
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
  // 最后添加404的捕获
  router.addRoute({
    path: '/:catchAll(.*)',
    redirect: '/404',
  });
  console.log(router.getRoutes());
  const userInfo = await fetchUserInfo();
  router.beforeEach(async (to, from, next) => {
    // 判断是否已经登录
    const token = localStorage.getItem('token');
    // 白名单放行
    if (whiteList.includes(to.fullPath)) {
      next();
    } else if (token) {
      if (hasPermission(userInfo.roles, to.meta.roles as string)) {
        // 继续执行默认逻辑，而next(to)会执行跳转to的逻辑，下次依然命中此处会造成死循环
        next();
      } else {
        next({ name: '401' });
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
};

const fetchUserInfo = async () => {
  const userId = localStorage.getItem('userId') || '';
  const userInfo = await getUserInfo(userId);
  if (isSuccess(userInfo)) {
    const data = userInfo.data;
    userStore.set(data);
    return data;
  }
  return {};
};

const hasPermission = (roles: string[], permissionRoles: string) => {
  if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some((role) => permissionRoles.indexOf(role) >= 0);
};

export { dynamicAddRoute };
