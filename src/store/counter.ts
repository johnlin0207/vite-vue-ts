import { defineStore } from 'pinia';

interface State {
  count: number;
}

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state: State) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
