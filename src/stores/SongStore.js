/* -- src\stores\SongStore.js -- */
import { defineStore } from 'pinia';

export const useSongStore = defineStore('song', {
  state: () => ({
    endPoint: null,

    songName: '',
    songpartName: null,
  }),

  getters: {},

  actions: {
    open(endPoint) {
      this.endPoint = endPoint;
      this.endPoint.on(
        'changed',
        (this.listener1 = function () {
          this.setSongName(this.endPoint.name);
          this.setSongpartName(this.endPoint.currentState);
        }.bind(this)),
      );
    },

    close() {
      this.endPoint.removeListener('nameChanged', this.listener1);
      this.endPoint = null;
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
