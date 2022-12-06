<template>
  <Header></Header>
  <el-row>
    <el-col :span="6"
      ><div class="grid-content ep-bg-purple-dark">
        <MenuTree></MenuTree>
      </div>
    </el-col>
    <el-col :span="18"
      ><div class="grid-content ep-bg-purple-dark">
        <router-view></router-view></div
    ></el-col>
  </el-row>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from '@/components/Home/Header.vue';
import MenuTree from '@/components/Home/MenuTree.vue';
</script>

<style scoped></style>
