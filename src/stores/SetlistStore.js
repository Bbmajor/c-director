/* -- src\stores\SetlistStore.js -- */
import { defineStore } from 'pinia';

export const useSetlistStore = defineStore('setlist', {
  state: () => ({
    endPoint: null,

    setlistName: 'No Set List',
    setlistItems: [],
    currentSongIndex: 0,
    currentSong: null,
    preLoaded: false,
  }),

  getters: {},

  actions: {
    open(endPoint) {
      this.endPoint = endPoint;
      this.endPoint.on(
        'changed',
        (this.listener1 = function () {
          this.setCurrentSong(this.endPoint.currentSong);
          this.setCurrentSongIndex(this.endPoint.currentSongIndex);
          this.setSetlistItems(this.endPoint.items);
          this.setSetlistName(this.endPoint.name);
          this.setPreLoaded(this.endPoint.preLoaded);
        }.bind(this)),
      );
      this.endPoint.on(
        'currentSongChanged',
        (this.listener2 = function () {
          this.setCurrentSong(this.endPoint.currentSong);
          this.setCurrentSongIndex(this.endPoint.currentSongIndex);
        }.bind(this)),
      );
      this.endPoint.open();
    },

    close() {
      this.endPoint.close();
      this.endPoint.removeListener('connecting', this.listener1);
      this.endPoint.removeListener('currentSongChanged', this.listener2);
      this.endPoint = null;
    },

    first() {
      this.endPoint.loadFirstSong();
    },

    last() {
      this.endPoint.loadLastSong();
    },

    next() {
      this.endPoint.loadNextSong(1);
    },

    previous() {
      this.endPoint.loadNextSong(-1);
    },

    setCurrentSong(song) {
      if (!song) {
        this.currentSong = null;
      } else {
        this.currentSong = song;
      }
    },

    setCurrentSongIndex(index) {
      if (!index) {
        this.currentSongIndex = 0;
      } else {
        this.currentSongIndex = index;
      }
    },

    setSetlistItems(items) {
      if (!items) {
        this.setlistItems = [];
      } else {
        this.setlistItems = items;
      }
    },

    setSetlistName(name) {
      if (!name) {
        this.setlistName = 'No Set List';
      } else {
        this.setlistName = name;
      }
    },

    setPreLoaded(preload) {
      if (!preload) {
        this.preLoaded = false;
      } else {
        this.preLoaded = true;
      }
    },
  },
});
