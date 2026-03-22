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

    setlistName: 'No Set List',
    setlistItems: [] as SetListItem[],
    currentSongIndex: 0,
    currentSong: {} as SetListItem,
    preLoaded: false,

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
      this.setCurrentSongIndex(this.endPoint.currentSongIndex);
      this.setSetlistItems(this.endPoint.items);
      this.setSetlistName(this.endPoint.name);
      this.setPreLoaded(this.endPoint.preLoaded);
      this.endPoint.available().then(this.setSetlists, this.noSetlists);
    },

    handleCurrentSongChanged() {
      this.setCurrentSong(this.endPoint.currentSong);
      this.setCurrentSongIndex(this.endPoint.currentSongIndex);
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

    setCurrentSong(song: SetListItem) {
      if (!song) {
        this.currentSong = {} as SetListItem;
      } else {
        this.currentSong = song;
      }
    },

    setCurrentSongIndex(index: number) {
      if (!index) {
        this.currentSongIndex = 0;
      } else {
        this.currentSongIndex = index;
      }
    },

    setSetlistItems(items: SetListItem[]) {
      if (!items) {
        this.setlistItems = [] as SetListItem[];
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
