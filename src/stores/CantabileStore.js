/* -- src\stores\CantabileStore.js -- */
import { defineStore } from 'pinia';

import { usePreferencesStore } from './PreferencesStore';
import { useApplicationStore } from './ApplicationStore';
import { useBindingsStore } from './BindingsStore';
import { useTransportStore } from './TransportStore';
import { useSetlistStore } from './SetlistStore';
import { useSongpartsStore } from './SongpartsStore';
import { useSongStore } from './SongStore';
import { useShownotesStore } from './ShownotesStore';

export const useCantabileStore = defineStore('cantabile', {
  state: () => ({
    endPoint: null,
    connectionState: 'Disconnected',

    preferencesStore: usePreferencesStore(),
    applicationStore: useApplicationStore(),
    bindingsStore: useBindingsStore(),
    transportStore: useTransportStore(),
    setlistStore: useSetlistStore(),
    songpartsStore: useSongpartsStore(),
    songStore: useSongStore(),
    shownotesStore: useShownotesStore(),
  }),

  getters: {
    isConnected: (state) => {
      return state.connectionState == 'Connected';
    },
  },

  actions: {
    async connect(endPoint) {
      this.preferencesStore.open();
      endPoint.on(
        'connecting',
        (this.listener1 = function () {
          this.connectionState = 'Connecting';
        }.bind(this)),
      );
      endPoint.on(
        'connected',
        (this.listener2 = function () {
          this.connectionState = 'Connected';
        }.bind(this)),
      );
      endPoint.on(
        'disconnected',
        (this.listener1 = function () {
          this.connectionState = 'Disconnected';
        }.bind(this)),
      );
      endPoint.connect();
      await endPoint.untilConnected();
      this.endPoint = endPoint;
      this.applicationStore.open(this.endPoint.application);
      this.bindingsStore.open(this.endPoint.bindings4);
      this.transportStore.open(this.endPoint.transport);
      this.setlistStore.open(this.endPoint.setList);
      this.songpartsStore.open(this.endPoint.songStates);
      this.songStore.open(this.endPoint.song);
      this.shownotesStore.open(this.endPoint.showNotes);
    },

    disconnect() {
      this.shownotesStore.close();
      this.songStore.close();
      this.songpartsStore.close();
      this.setlistStore.close();
      this.transportStore.close();
      this.bindingsStore.close();
      this.applicationStore.close();
      this.endPoint.removeListener('connecting', this.listener1);
      this.endPoint.removeListener('connected', this.listener2);
      this.endPoint.removeListener('disconnected', this.listener1);
      this.endPoint.disconnect();
      this.endPoint = null;
      this.preferencesStore.close();
    },
  },
});
