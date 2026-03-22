import { defineStore } from 'pinia';
import {
  type SongPartsEndPoint,
  type SongPart,
  type ListenSpec,
  type ListOption,
} from '@/types';

export const useSongpartsStore = defineStore('songparts', {
  state: () => ({
    endPoint: {} as SongPartsEndPoint,

    name: '',
    items: [] as ListOption[],
    currentPartIndex: -1,
    currentPart: {} as SongPart,

    listeners: [
      {
        event: 'currentStateChanged',
        action: 'handleCurrentStateChanged',
        listener: null,
      },
      {
        event: 'reload',
        action: 'handleReload',
        listener: null,
      },
    ] as ListenSpec[],
  }),

  getters: {
    disabled: function (state) {
      return state.currentPartIndex == -1;
    },
    currentPartName: function (state) {
      if (state.currentPart) {
        return state.currentPart.name;
      } else {
        return 'No Song Part';
      }
    },
  },

  actions: {
    open(endPoint: SongPartsEndPoint) {
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
      this.endPoint = {} as SongPartsEndPoint;
    },

    handleCurrentStateChanged() {
      this.setCurrentPart(this.endPoint.currentState);
      this.setCurrentPartIndex(this.endPoint.currentStateIndex);
    },

    handleReload() {
      this.setSongPartItems(this.endPoint.items);
      this.setCurrentPart(this.endPoint.currentState);
      this.setCurrentPartIndex(this.endPoint.currentStateIndex);
    },

    loadSongPart(value: number) {
      this.endPoint.loadStateByProgram(value);
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

    setSongPartItems(items: SongPart[]) {
      this.items = items.map((item) => {
        return { text: item.name, value: item.pr, disabled: false };
      });
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
