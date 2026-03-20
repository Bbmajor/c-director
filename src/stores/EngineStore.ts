import { defineStore } from 'pinia';
import { useBindingsStore } from '@/stores/BindingsStore';
import { type WatchSpec, type Binding4Watcher } from '@/types';

export const useEngineStore = defineStore('engine', {
  state: () => ({
    bindableId: 'engine',
    sounds: 0,

    watchers: [
      {
        bindingPointId: 'allSoundsOff',
        action: 'setSounds',
        watcher: {} as Binding4Watcher,
      },
    ] as WatchSpec[],

    bindingsStore: useBindingsStore(),
  }),

  getters: {},

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

    setSounds(value) {
      this.soundsOn = value ? 1 : 0;
    },

    allSoundsOff() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'allSoundsOff',
      });
    },
  },
});
