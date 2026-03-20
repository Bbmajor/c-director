/* -- src\stores\MediaPlayerStore.js -- */
import { defineStore } from 'pinia';
import { useBindingsStore } from '@/stores/BindingsStore';
import { type WatchSpec, type Binding4Watcher } from '@/types';

const $rack = 0; // rack index; 0=Song,
const mediaStateText = ['stopped', 'playing', 'paused'];

export const useMediaPlayerStore = defineStore('mediaplayer', {
  state: () => ({
    bindableId: 'indexedMediaPlayer',

    watchers: [
      { bindingPointId: 'name', action: 'setPlayerName', watcher: null },
      {
        bindingPointId: 'selectedFileIndex',
        action: 'setFileIndex',
        watcher: {} as Binding4Watcher,
      },
      {
        bindingPointId: 'selectedFileName',
        action: 'setFileName',
        watcher: {} as Binding4Watcher,
      },
      {
        bindingPointId: 'selectedPlayRangeIndexed',
        action: 'setRangeIndex',
        watcher: {} as Binding4Watcher,
      },
      { bindingPointId: 'state', action: 'setPlayerState', watcher: null },
    ] as WatchSpec[],

    mediaState: '',
    player: { index: 0, name: 'No Player' },
    file: { index: -1, name: 'No Media' },
    range: { index: -1, name: 'No Range' },

    bindingsStore: useBindingsStore(),
  }),

  getters: {
    bindableParams: (state) => {
      return {
        rackIndex: $rack,
        mediaPlayerIndex: state.player.index,
      };
    },
  },

  actions: {
    open() {
      for (const watch of this.watchers) {
        watch.watcher = this.bindingsStore.watchBindingPoint({
          bindableId: this.bindableId,
          bindingPointId: watch.bindingPointId,
          bindableParams: this.bindableParams,
          callback: this[watch.action],
        });
      }
    },

    nextFile() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'nextFile',
        bindableParams: this.bindableParams,
      });
    },

    previousFile() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'previousFile',
        bindableParams: this.bindableParams,
      });
    },

    selectFile(index) {
      if (index > this.file.index) {
        this.nextFile();
      } else {
        if (index < this.file.index) {
          this.previousFile();
        }
      }
    },

    nextPlayRange() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'nextPlayRange',
        bindableParams: this.bindableParams,
      });
    },

    previousPlayRange() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'previousPlayRange',
        bindableParams: this.bindableParams,
      });
    },

    selectRange(index) {
      if (index > this.range.index) {
        this.nextPlayRange();
      } else {
        if (index < this.range.index) {
          this.previousPlayRange();
        }
      }
    },

    play() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'play',
        bindableParams: this.bindableParams,
      });
    },

    pause() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'playPause',
        bindableParams: this.bindableParams,
      });
    },

    stop() {
      this.bindingsStore.invoke({
        bindableId: this.bindableId,
        bindingPointId: 'stop',
        bindableParams: this.bindableParams,
      });
    },

    setFileName(mediaName) {
      if (!mediaName) {
        this.file.name = 'No-Media';
      } else {
        this.file.name = mediaName;
      }
    },

    setFileIndex(mediaIndex) {
      this.file.index = mediaIndex;
    },

    setRangeIndex(rangeIndex) {
      this.range.index = rangeIndex;
    },

    setPlayerName(name) {
      if (!name) {
        this.player.name = 'No-Player';
      } else {
        this.player.name = name;
      }
    },

    setPlayerState(mediaState) {
      if (this.player.name == 'No-Player') {
        this.mediaState = '';
      } else {
        this.mediaState = mediaStateText[mediaState];
      }
    },
  },
});
