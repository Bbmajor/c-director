/* -- src\stores\BindingsStore.js -- */
import { defineStore } from 'pinia';
import { useEngineStore } from './EngineStore';
import { useMediaPlayerStore } from './MediaPlayerStore';
import { useMetronomeStore } from './MetronomeStore';
import { useRecorderStore } from './RecorderStore';
import { useSetlistsStore } from './SetlistsStore';

export const useBindingsStore = defineStore('bindings', {
  state: () => ({
    endPoint: null,

    engine: useEngineStore(),
    mediaplayer: useMediaPlayerStore(),
    metronome: useMetronomeStore(),
    recorder: useRecorderStore(),
    setlists: useSetlistsStore(),
  }),

  getters: {},

  actions: {
    open(endPoint) {
      this.endPoint = endPoint;

      this.engine.open();
      this.metronome.open();
      this.recorder.open();
      this.mediaplayer.open();
      this.setlists.open();

      this.endPoint.open();
    },

    close() {
      this.endPoint.close();
      this.endPoint = null;
    },

    invoke({
      bindableId,
      bindingPointId,
      value,
      bindableParams,
      bindingPointParams,
    }) {
      this.endPoint.invoke(
        bindableId,
        bindingPointId,
        value,
        bindableParams,
        bindingPointParams,
      );
    },

    query({ bindableId, bindingPointId, bindableParams, bindingPointParams }) {
      return this.endPoint.query(
        bindableId,
        bindingPointId,
        bindableParams,
        bindingPointParams,
      );
    },

    watch({
      bindableId,
      bindingPointId,
      bindableParams,
      bindingPointParams,
      callback,
    }) {
      return this.endPoint.watch(
        bindableId,
        bindingPointId,
        bindableParams,
        bindingPointParams,
        callback,
      );
    },

    watchBindingPoint(watching) {
      return this.watch({
        bindableId: watching.bindableId,
        bindingPointId: watching.bindingPointId,
        bindableParams: watching.bindableParams,
        bindingPointParams: watching.bindingPointParams,
        callback: watching.callback,
      });
    },
  },
});
