/* -- src\stores\SetlistsStore.js -- */
import { defineStore } from 'pinia';
import { useBindingsStore } from './BindingsStore';

export const useSetlistsStore = defineStore('setlists', {
  state: () => ({
    bindableId: 'setList',
    watch: {}, // define bindingPointId: 'callback function name'
    watchers: [],

    bindingsStore: useBindingsStore(),
  }),

  actions: {
    open() {
      for (const [bindingPointId, callback] of Object.entries(this.watch)) {
        this.watchers.push(
          this.bindingsStore.watchBindingPoint({
            bindableId: this.bindableId,
            bindingPointId: bindingPointId,
            callback: this[callback],
          }),
        );
      }
    },
  },
});
