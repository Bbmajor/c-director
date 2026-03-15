/* -- src\stores\MediaPlayerStore.js -- */
import { defineStore } from 'pinia';
import { useBindingsStore } from './BindingsStore';

const $rack = 0; // rack index; 0=Song,
const mediaStateText = ['stopped', 'playing', 'paused'];

export const useMediaPlayerStore = defineStore('mediaplayer', {
  state: () => ({
    bindableId: 'indexedMediaPlayer',
    watch: {
      // specify bindingPointId: callback function name
      name: 'setPlayerName',
      selectedFileIndex: 'setFileIndex',
      selectedFileName: 'setFileName',
      selectedPlayRangeIndexed: 'setRangeIndex',
      state: 'setPlayerState',
    },
    watchers: [],

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
      for (const [bindingPointId, callback] of Object.entries(this.watch)) {
        this.watchers.push(
          this.bindingsStore.watchBindingPoint({
            bindableId: this.bindableId,
            bindingPointId: bindingPointId,
            bindableParams: this.bindableParams,
            callback: this[callback],
          }),
        );
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
