/* -- src\stores\TransportStore.js -- */
import { defineStore } from 'pinia';

export const useTransportStore = defineStore('transport', {
  state: () => ({
    endPoint: null,

    tempo: 120,
    timeSignature: '4/4',
    mediaState: 'Stopped',
  }),

  getters: {},

  actions: {
    open(endPoint) {
      this.endPoint = endPoint;
      this.endPoint.on(
        'stateChanged',
        (this.listener1 = function () {
          this.setMediaState(this.endPoint.state);
        }.bind(this)),
      );
      this.endPoint.on(
        'tempoChanged',
        (this.listener2 = function () {
          this.setTempo(this.endPoint.tempo);
        }.bind(this)),
      );
      this.endPoint.on(
        'timeSignatureChanged',
        (this.listener3 = function () {
          this.setTimeSignature(this.endPoint.timeSignature);
        }.bind(this)),
      );
    },

    close() {
      this.endPoint.removeListener('stateChanged', this.listener1);
      this.endPoint.removeListener('tempoChanged', this.listener2);
      this.endPoint.removeListener('timeSignatureChanged', this.listener3);
      this.endPoint = null;
    },

    play() {
      if (this.endPoint) this.endPoint.play();
    },

    pause() {
      if (this.endPoint) this.endPoint.togglePause();
    },

    stop() {
      if (this.endPoint) this.endPoint.stop();
    },

    setMediaState(transportState) {
      this.mediaState = transportState;
    },

    setTempo(transportTempo) {
      this.tempo = transportTempo;
    },

    setTimeSignature(signature) {
      this.timeSignature = signature;
    },
  },
});
