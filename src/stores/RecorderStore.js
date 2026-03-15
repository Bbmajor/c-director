/* -- src\stores\MetronomeStore.js -- */
import { defineStore } from 'pinia';
import { useBindingsStore } from './BindingsStore';

const recorderStates = ['Not Recording', 'Waiting', 'Recording'];

export const useRecorderStore = defineStore('recorder', {
  state: () => ({
    bindableId: 'recorder',
    watch: {
      // specify bindingPointId: 'callback function name'
      toggleRecording: 'setRecording',
      toggleAutoRecord: 'setAutoRecord',
    },
    watchers: [],

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
