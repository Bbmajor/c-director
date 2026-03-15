/* -- src\stores\MetronomeStore.js -- */
import { defineStore } from 'pinia';
import { useBindingsStore } from './BindingsStore';

export const useMetronomeStore = defineStore('metronome', {
  state: () => ({
    bindableId: 'metronome',

    sounds: 0,
    tempo: 120,
    numerator: 4,
    denominatorp2: 2,

    watch: {
      // specify bindingPointId: 'callback function name'
      enableSounds: 'setSounds',
      tempo: 'setTempo',
      timeSignatureNumerator: 'setNumerator',
      timeSignatureDenominator2Power: 'setDenominatorp2',
    },
    watchers: [],

    bindingsStore: useBindingsStore(),
  }),

  getters: {
    soundsEnabled: (state) => {
      return state.sounds == 1;
    },
    beatsPerMeasure: (state) => {
      return Math.pow(2, state.denominatorp2);
    },
    signature: (state) => {
      return state.numerator + '/' + state.beatsPerMeasure;
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

    enableSounds(sounds) {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'enableSounds',
        value: sounds,
      });
    },

    selectTempo(tempo) {
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
