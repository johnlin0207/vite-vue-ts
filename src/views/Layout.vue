<template>
  <div class="layout">
    <div class="header">
      <Header></Header>
    </div>
    <div class="main">
      <MenuTree></MenuTree>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from '@/components/Home/Header.vue';
import MenuTree from '@/components/Home/MenuTree.vue';
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 5px;
}
.content {
  flex: 1;
  padding: 0 10px 0 10px;
  overflow: auto;
}
</style>
