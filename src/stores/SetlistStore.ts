import { defineStore } from 'pinia';
import {
  type SetListEndPoint,
  type SetListItem,
  type ListenSpec,
  type ListOption,
} from '@/types';

export const useSetlistStore = defineStore('setlist', {
  state: () => ({
    endPoint: {} as SetListEndPoint,

    setlists: [] as ListOption[],
    currentSetlist: 'No Set List',

    songs: [] as ListOption[],
    currentSong: {} as SetListItem,

    listeners: [
      {
        event: 'changed',
        action: 'handleChanged',
        listener: null,
      },
      {
        event: 'currentSongChanged',
        action: 'handleCurrentSongChanged',
        listener: null,
      },
      {
        event: 'reload',
        action: 'handleChanged',
        listener: null,
      },
    ] as ListenSpec[],
  }),

  getters: {
    currentSongName: (state) => {
      if (state.currentSong) {
        return state.currentSong.name;
      } else {
        return 'No Song';
      }
    },
  },

  actions: {
    open(endPoint: SetListEndPoint) {
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
      this.endPoint = {} as SetListEndPoint;
    },

    handleChanged() {
      this.setCurrentSong(this.endPoint.currentSong);
      this.setCurrentSetlist(this.endPoint.name);
      this.setSongs(this.endPoint.items);
      this.endPoint.available().then(this.setSetlists, this.noSetlists);
    },

    handleCurrentSongChanged() {
      this.setCurrentSong(this.endPoint.currentSong);
    },

    loadSetlist(value: string) {
      this.endPoint.loadSetList(value, true);
    },

    loadSong(value: number) {
      this.endPoint.loadSongByProgram(value);
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

    setSetlists(setlists: string[]) {
      this.setlists = setlists.map((setlistName) => {
        return { text: setlistName, value: setlistName, disabled: false };
      });
    },

    noSetlists() {
      this.setlists = [];
    },

    setCurrentSetlist(name: string) {
      if (!name) {
        this.currentSetlist = 'No Set List';
      } else {
        this.currentSetlist = name;
      }
    },

    setSongs(items: SetListItem[]) {
      if (!items) {
        this.songs = [] as ListOption[];
      } else {
        this.songs = items.map((item) => {
          return {
            text: item.name,
            value: item.pr,
            disabled: item.kind == 'break',
          };
        });
      }
    },

    setCurrentSong(song: SetListItem) {
      if (!song) {
        this.currentSong = {} as SetListItem;
      } else {
        this.currentSong = song;
      }
    },
  },
});
