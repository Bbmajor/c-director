import { defineStore } from 'pinia';
import { type Engine } from '@/types';

export const useEngineStore = defineStore('engine', {
  state: () => ({
    engine: {} as Engine,
    started: false,
  }),

  getters: {},

  actions: {
    async open(engine: Engine) {
      await engine.isStarted().then((value) => {
        this.engine = engine;
        this.started = value;
      });
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
