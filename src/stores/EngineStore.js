/* -- src\stores\EngineStore.js -- */
import { defineStore } from 'pinia';
import { useBindingsStore } from './BindingsStore';

export const useEngineStore = defineStore('engine', {
  state: () => ({
    bindableId: 'engine',
    watch: {
      // specify bindingPointId: 'callback function name'
    },
    watchers: [],

    bindingsStore: useBindingsStore(),
  }),

  getters: {},

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
