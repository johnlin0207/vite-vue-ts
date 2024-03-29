import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import NotFound from '@/views/404.vue';
import About from '@/views/About.vue';
import Layout from '@/views/Layout.vue';

const constantRoute = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    // meta: { keepAlive: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
});

export default router;
