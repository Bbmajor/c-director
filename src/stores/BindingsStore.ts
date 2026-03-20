import { defineStore } from 'pinia';
import { useEngineStore } from '@/stores/EngineStore';
import { useMediaPlayerStore } from '@/stores/MediaPlayerStore';
import { useMetronomeStore } from '@/stores/MetronomeStore';
import { useRecorderStore } from '@/stores/RecorderStore';
import { useSetlistsStore } from '@/stores/SetlistsStore';
import { type Bindings4EndPoint } from '@/types';

export const useBindingsStore = defineStore('bindings', {
  state: () => ({
    endPoint: {} as Bindings4EndPoint,

    engine: useEngineStore(),
    mediaplayer: useMediaPlayerStore(),
    metronome: useMetronomeStore(),
    recorder: useRecorderStore(),
    setlists: useSetlistsStore(),
  }),

  getters: {},

  actions: {
    open(endPoint: Bindings4EndPoint) {
      this.endPoint = endPoint;

      this.engine.open();
      this.setlists.open();
      this.metronome.open();
      this.recorder.open();
      this.mediaplayer.open();

      this.endPoint.open();
    },

    close() {
      this.endPoint.close();
      this.endPoint = {} as Bindings4EndPoint;
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
