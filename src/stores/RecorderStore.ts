/* -- src\stores\MetronomeStore.js -- */
import { defineStore } from 'pinia';
import { useBindingsStore } from '@/stores/BindingsStore';
import { type WatchSpec, type Binding4Watcher } from '@/types';

const recorderStates = ['Not Recording', 'Waiting', 'Recording'];

export const useRecorderStore = defineStore('recorder', {
  state: () => ({
    bindableId: 'recorder',
    watchers: [
      {
        bindingPointId: 'toggleRecording',
        action: 'setRecording',
        watcher: {} as Binding4Watcher,
      },
      {
        bindingPointId: 'toggleAutoRecord',
        action: 'setAutoRecord',
        watcher: {} as Binding4Watcher,
      },
    ] as WatchSpec[],

    recording: 0,
    autoRecord: 0,

    bindingsStore: useBindingsStore(),
  }),

  getters: {
    recorderState: (state) => {
      if (!state.recording && !state.autoRecord) {
        return recorderStates[0];
      } else {
        if (!state.recording && state.autoRecord) {
          return recorderStates[1];
        } else {
          return recorderStates[2];
        }
      }
    },
    isRecording: (state) => {
      return state.recording == 1;
    },
    isAutoRecord: (state) => {
      return state.autoRecord == 1;
    },
  },

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

    toggleRecording() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'toggleRecording',
      });
    },

    toggleAutoRecord() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'toggleAutoRecord',
      });
    },

    setRecording(value) {
      this.recording = value == 1 ? 1 : 0;
    },

    setAutoRecord(value) {
      this.autoRecord = value == 1 ? 1 : 0;
    },
  },
});
