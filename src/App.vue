<template>
  <router-view v-slot="{ Component, route }">
    <transition>
      <component :is="Component" />
    </transition>
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
