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

let hasSetRoute = false;

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

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
});

const loadViewComponent = (component: string | any) => () =>
  import(`@/views/${component}.vue`);

const fetchMenu = () => {
  const userId = localStorage.getItem('userId') || '';
  return getRoutes(userId);
};

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
  const resData = await fetchMenu();
  if (isSuccess(resData)) {
    const {
      status,
      msg,
      data: { routes = [] },
    } = resData;

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
    router.addRoute({
      path: '/:catchAll(.*)',
      redirect: '/404',
    });
    hasSetRoute = true;
  } else {
    ElMessage.error(resData.msg || request.fail);
  }
};

router.beforeEach(async (to, from, next) => {
  // 判断是否已经登录
  const token = localStorage.getItem('token');
  // 已登录但未设置权限路由
  if (token && !hasSetRoute) {
    // 重新设置权限路由
    await dynamicAddRoute();
    next(to);
  } else if (!token && to.path === '/') {
    next({ name: 'login' });
  } else {
    // 未登录
    next();
  }
});

export default router;
