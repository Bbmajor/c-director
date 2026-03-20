/* -- src\stores\SetlistsStore.js -- */
import { defineStore } from 'pinia';
import { useBindingsStore } from '@/stores/BindingsStore';
import { type WatchSpec } from '@/types';

export const useSetlistsStore = defineStore('setlists', {
  state: () => ({
    bindableId: 'setList',

    watchers: [] as WatchSpec[],

    bindingsStore: useBindingsStore(),
  }),

  actions: {
    open() {
      for (const watch of this.watchers) {
        watch.watcher = this.bindingsStore.watchBindingPoint({
          bindableId: this.bindableId,
          bindingPointId: watch.bindingPointId,
          callback: this[watch.action],
        });
      }
    },
  },
});
