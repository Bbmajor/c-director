import { defineStore } from 'pinia';
import {
  type SetListEndPoint,
  type SetListItem,
  type ListenSpec,
} from '@/types';

export const useSetlistStore = defineStore('setlist', {
  state: () => ({
    endPoint: {} as SetListEndPoint,

    setlists: [] as string[],
    currentSetlist: 'No Set List',

    songs: [] as SetListItem[],
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

    loadSetlist(name) {
      this.endPoint.loadSetList(name, true);
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
      this.setlists = setlists;
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
        this.songs = [] as SetListItem[];
      } else {
        this.songs = items;
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
