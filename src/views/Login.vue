<template>
  <div>
    <el-input v-model="username" placeholder="Please input" />
    <el-input type="password" v-model="pwd" placeholder="Please input" />
    <el-button @click="loginFn">登录</el-button>
    <router-link to="/about">关于</router-link>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useRouter } from 'vue-router';
import { reactive, ref, toRaw } from 'vue';
import { ElMessage, ElLoading } from 'element-plus';
import { login } from '@/api/login';
import md5 from 'js-md5';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const router = useRouter();
const username = ref('');
const pwd = ref('');
const loginFn = () => {
  NProgress.start();
  const u = username.value;
  const p = pwd.value;
  if (u && p) {
    login({ username: u, pwd: md5(p) })
      .then((res) => {
        const {
          data: { token, userId },
        } = res;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', u);
        const redirectPath = router.currentRoute.value.redirectedFrom;
        if (redirectPath && redirectPath.fullPath !== '/login') {
          router.push(redirectPath.fullPath);
        } else {
          router.push('/');
        }
      })
      .catch((err: any) => {
        console.log(err);
        ElMessage.error(err.message);
      })
      .finally(() => {
        NProgress.done();
      });
  } else {
    ElMessage.error('Oops, this is a error message.');
  }
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
