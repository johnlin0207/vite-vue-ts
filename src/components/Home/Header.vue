<template>
  <el-row class="header">
    <el-col :span="4"
      ><div class="grid-content ep-bg-purple-dark logo">
        <img src="/vite.svg" alt="" @click="toHome" class="pointer" /></div
    ></el-col>
    <el-col :span="16"
      ><div class="grid-content ep-bg-purple-dark"></div
    ></el-col>
    <el-col :span="4"
      ><div class="grid-content ep-bg-purple-dark user">
        <el-dropdown>
          <span class="el-dropdown-link pointer">
            {{ username }}
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleClose">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div></el-col
    >
  </el-row>
</template>

<script lang="ts" setup>
import { defineComponent, reactive } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import router from '@/router';
import { ElMessageBox } from 'element-plus';

const username = localStorage.getItem('username');

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('要退出登录吗？')
    .then(() => {
      logout();
    })
    .catch(() => {});
};

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

const toHome = () => {
  router.push('/');
};
</script>

<style scoped>
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.header {
  padding: 10px 10px;
}
.grid-content {
  border-radius: 4px;
  min-height: 20px;
}
.user {
  text-align: right;
}

.pointer {
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
