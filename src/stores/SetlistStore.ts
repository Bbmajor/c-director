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
    currentSetlist: {} as ListOption,

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
      // handle setlists asynchronous
      this.endPoint.available().then(this.handleSetlists, this.noSetlists);
      // handle songs
      this.setSongs(this.endPoint.items);
      this.setCurrentSong(this.endPoint.currentSong);
    },

    handleCurrentSongChanged() {
      this.setCurrentSong(this.endPoint.currentSong);
    },

    handleSetlists(setlists: string[]) {
      this.setSetlists(setlists);
      this.setCurrentSetlist(this.endPoint.name);
    },

    setSetlists(setlists: string[]) {
      const list = [] as ListOption[];
      for (const [index, setlist] of setlists.entries()) {
        list.push({ text: setlist, value: index, disabled: false });
      }
      this.setlists = list;
    },

    noSetlists() {
      this.setlists = [];
    },

    setCurrentSetlist(name: string) {
      let list: ListOption | undefined;
      if (name) list = this.setlists.find((setlist) => setlist.text == name);

      if (list) {
        this.currentSetlist = list;
      } else {
        this.currentSetlist = {
          text: 'No Set Lists',
          value: -1,
          disabled: true,
        };
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

    loadSetlist(value: number) {
      this.endPoint.loadSetList(this.setlists[value].text, true);
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
  },
});
