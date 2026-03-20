import { defineStore } from 'pinia';
import { type TransportEndPoint, type ListenSpec } from '@/types';

export const useTransportStore = defineStore('transport', {
  state: () => ({
    endPoint: {} as TransportEndPoint,

    tempo: 120,
    timeSignature: '4/4',
    mediaState: 'Stopped',

    listeners: [
      {
        event: 'stateChanged',
        action: 'setMediaState',
        listener: null,
      },
      {
        event: 'tempoChanged',
        action: 'setTempo',
        listener: null,
      },
      {
        event: 'timeSignatureChanged',
        action: 'setTimeSignature',
        listener: null,
      },
    ] as ListenSpec[],
  }),

  getters: {},

  actions: {
    open(endPoint: TransportEndPoint) {
      this.endPoint = endPoint;
      for (const listen of this.listeners) {
        this.endPoint.on(
          listen.event,
          (listen.listener = this[listen.action].bind(this)),
        );
      }
    },

    close() {
      if (this.endPoint) {
        for (const listen of this.listeners) {
          this.endPoint.removeListener(listen.event, listen.listener);
        }
        this.endPoint.close();
      }
      this.endPoint = {} as TransportEndPoint;
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

    setMediaState() {
      this.mediaState = this.endPoint.state;
    },

    setTempo() {
      this.tempo = this.endPoint.tempo;
    },

    setTimeSignature() {
      this.timeSignature = this.endPoint.timeSignature;
    },
  },
});
