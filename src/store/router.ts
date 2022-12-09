import { defineStore } from 'pinia';
import { Routes } from '@/utils/interface';

type Routers = Array<Routes>;

interface State {
  stateRouter: Routers | null;
}

export const useRouterStore = defineStore('router', {
  state: (): State => ({ stateRouter: null }),
  actions: {
    set(r: Routers) {
      this.stateRouter = r;
    },
  },
});
