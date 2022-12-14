<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
