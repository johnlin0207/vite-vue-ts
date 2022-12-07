<template>
  <Header></Header>
  <div class="layout">
    <MenuTree></MenuTree>
    <div class="contentWidth">
      <router-view></router-view>
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
  padding: 5px;
}

.contentWidth {
  flex: 1;
}
</style>
