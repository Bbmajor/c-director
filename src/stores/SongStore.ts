import { defineStore } from 'pinia';
import { type SongEndPoint, type ListenSpec } from '@/types';

export const useSongStore = defineStore('song', {
  state: () => ({
    endPoint: {} as SongEndPoint,

    songName: 'No Song',
    songpartName: 'No Song Parts',

    listeners: [
      {
        event: 'changed',
        action: 'handleChanged',
        listener: null,
      },
    ] as ListenSpec[],
  }),

  getters: {},

  actions: {
    open(endPoint: SongEndPoint) {
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
      this.endPoint = {} as SongEndPoint;
    },

    handleChanged() {
      this.setSongName(this.endPoint.name);
      this.setSongpartName(this.endPoint.currentState);
    },

    setSongName(name) {
      if (!name) {
        this.songName = 'No Song';
      } else {
        this.songName = name;
      }
    },

    setSongpartName(name) {
      if (!name) {
        this.songpartName = 'No Song Parts';
      } else {
        this.songpartName = name;
      }
    },
  },
});
