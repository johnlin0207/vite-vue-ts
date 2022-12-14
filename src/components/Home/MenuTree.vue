<template>
  <el-menu
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="selectItem"
    :default-active="currentPath"
    router="true"
  >
    <el-sub-menu index="/menu1/">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item index="/menu1/menu1_1">item one</el-menu-item>
      <el-menu-item index="/menu1/menu1_2">item two</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/menu2/">
      <el-icon><icon-menu /></el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="/menu3" disabled>
      <el-icon><document /></el-icon>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="/menu4">
      <el-icon><setting /></el-icon>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import { watch, ref } from 'vue';

const router = useRouter();
const route = useRoute();
const currentPath = ref(route.fullPath);

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const selectItem = (index: string, indexPath: string, routeResult: any) => {
  // console.log(index, indexPath, routeResult);
  router.push(index);
};

watch(
  () => route.fullPath,
  (n, o) => {
    currentPath.value = n;
  }
);
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
