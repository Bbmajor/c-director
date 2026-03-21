import { defineStore } from 'pinia';
import { type Engine } from '@/types';

export const useEngineStore = defineStore('engine', {
  state: () => ({
    engine: {} as Engine,
  }),

  getters: {
    isStarted(state) {
      return state.engine.isStarted();
    },
  },

  actions: {
    open(engine: Engine) {
      this.engine = engine;
    },

    close() {
      this.engine = {} as Engine;
    },

    restart() {
      this.engine.restart();
    },

    start() {
      this.engine.start();
    },

    startStop() {
      this.engine.startStop();
    },

    stop() {
      this.engine.stop();
    },
  },
});
