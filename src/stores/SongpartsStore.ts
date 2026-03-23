import { defineStore } from 'pinia';
import {
  type SongPartsEndPoint,
  type SongPart,
  type ListenSpec,
  type ListOption,
} from '@/types';

const noParts = {
  text: 'No Parts',
  value: -1,
  disabled: true,
};

export const useSongpartsStore = defineStore('songparts', {
  state: () => ({
    endPoint: {} as SongPartsEndPoint,

    songParts: [noParts] as ListOption[],
    currentPart: {} as ListOption,

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
      return state.currentPart.value == -1;
    },
    currentPartName: function (state) {
      return state.currentPart.text;
    },
    currentPartProgram: function (state) {
      return state.currentPart.value;
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
    },

    handleReload() {
      this.setSongParts(this.endPoint.items);
      this.setCurrentPart(this.endPoint.currentState);
    },

    setSongParts(items: SongPart[]) {
      if (items && items.length > 0) {
        this.songParts = items.map((item) => {
          return { text: item.name, value: item.pr, disabled: false };
        });
      } else {
        this.songParts = [noParts] as ListOption[];
      }
    },

    setCurrentPart(currentPart) {
      if (currentPart) {
        this.currentPart = {
          text: currentPart.name,
          value: currentPart.pr,
          disabled: false,
        };
      } else {
        this.currentPart = noParts;
      }
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
  },
});
