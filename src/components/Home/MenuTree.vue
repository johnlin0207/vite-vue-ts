<template>
  <el-row>
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="selectItem"
        :collapse="isCollapse"
      >
        <el-sub-menu index="/menu1/">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="/menu1/menu1_1">item one</el-menu-item>
            <el-menu-item index="/menu1/menu1_2">item two</el-menu-item>
          </el-menu-item-group>
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
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
const isCollapse = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const selectItem = (index: string, indexPath: string, routeResult: any) => {
  console.log(index, indexPath, routeResult);
  router.push(index);
};
</script>
