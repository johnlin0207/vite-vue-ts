<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="'fade'" appear>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
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
