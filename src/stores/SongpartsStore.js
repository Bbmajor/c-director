/* -- src\stores\SongpartsStore.js -- */
import { defineStore } from 'pinia';

export const useSongpartsStore = defineStore('songparts', {
  state: () => ({
    endPoint: null,

    name: '', // The display name of the containing song
    items: [], // The array[0..n] of song parts { color: number, name: string, pr: number }
    currentPartIndex: -1, // The index of the currently loaded song part (or -1 if no active part)
    currentPart: null, // The currently loaded song part { color: number, name: string, pr: number } (or null if no active part)
  }),

  getters: {
    disabled: function () {
      return this.currentPartIndex == -1;
    },
    currentPartName: function () {
      if (this.currentPart) {
        return this.currentPart.name;
      } else {
        return 'No Song Part';
      }
    },
  },

  actions: {
    open(endPoint) {
      this.endPoint = endPoint;
      this.endPoint.on(
        'currentStateChanged',
        (this.listener1 = function () {
          this.setCurrentPart(this.endPoint.currentState);
          this.setCurrentPartIndex(this.endPoint.currentStateIndex);
        }.bind(this)),
      );
      this.endPoint.on(
        'reload',
        (this.listener2 = function () {
          this.setSongPartItems(this.endPoint.items);
          this.setCurrentPart(this.endPoint.currentState);
          this.setCurrentPartIndex(this.endPoint.currentStateIndex);
        }.bind(this)),
      );
    },

    close() {
      this.endPoint.removeListener('currentStateChanged', this.listener1);
      this.endPoint.removeListener('reload', this.listener2);
      this.endPoint = null;
    },

    first() {
      this.endPoint.loadFirstState();
    },

    next() {
      this.endPoint.loadNextState(1);
    },

    previous() {
      this.endPoint.loadNextState(-1);
    },

    last() {
      this.endPoint.loadLastState();
    },

    setSongPartItems(items) {
      this.items = items;
    },

    setCurrentPart(currentPart) {
      this.currentPart = currentPart;
    },

    setCurrentPartIndex(index) {
      this.currentPartIndex = index;
      if (index < 0) {
        this.name = 'No Song Parts';
      } else {
        this.name = this.currentPart.name;
      }
    },
  },
});
