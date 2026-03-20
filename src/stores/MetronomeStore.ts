/* -- src\stores\MetronomeStore.js -- */
import { defineStore } from 'pinia';
import { useBindingsStore } from '@/stores/BindingsStore';
import { type WatchSpec, type Binding4Watcher } from '@/types';

export const useMetronomeStore = defineStore('metronome', {
  state: () => ({
    bindableId: 'metronome',

    sounds: 0,
    tempo: 120,
    numerator: 4,
    denominatorp2: 2,

    watchers: [
      {
        bindingPointId: 'enableSounds',
        action: 'setSounds',
        watcher: {} as Binding4Watcher,
      },
      {
        bindingPointId: 'tempo',
        action: 'setTempo',
        watcher: {} as Binding4Watcher,
      },
      {
        bindingPointId: 'timeSignatureNumerator',
        action: 'setNumerator',
        watcher: {} as Binding4Watcher,
      },
      {
        bindingPointId: 'timeSignatureDenominator2Power',
        action: 'setDenominatorp2',
        watcher: {} as Binding4Watcher,
      },
    ] as WatchSpec[],

    bindingsStore: useBindingsStore(),
  }),

  getters: {
    soundsEnabled: (state) => {
      return state.sounds == 1;
    },

    signature: (state) => {
      return state.numerator + '/' + Math.pow(2, state.denominatorp2);
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

    selectNumerator(numerator) {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'timeSignatureNumerator',
        value: numerator,
      });
    },

    selectDenominator(denominatorp2) {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'timeSignatureDenominator2Power',
        value: denominatorp2,
      });
    },

    enableSounds(sounds: boolean) {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'enableSounds',
        value: sounds,
      });
    },

    selectTempo(tempo: number) {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'tempo',
        value: tempo,
      });
    },

    setSounds(value) {
      this.sounds = value ? 1 : 0;
    },
    setTempo(value) {
      this.tempo = value;
    },
    setNumerator(value) {
      this.numerator = value;
    },
    setDenominatorp2(value) {
      this.denominatorp2 = value;
    },
  },
});
