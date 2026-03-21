import { defineStore } from 'pinia';
import { type CantabileApi, type ListenSpec } from '@/types';

import { usePreferencesStore } from '@/stores/PreferencesStore';
import { useApplicationStore } from '@/stores/ApplicationStore';
import { useBindingsStore } from '@/stores/BindingsStore';
import { useTransportStore } from '@/stores/TransportStore';
import { useSetlistStore } from '@/stores/SetlistStore';
import { useSongpartsStore } from '@/stores/SongpartsStore';
import { useSongStore } from '@/stores/SongStore';
import { useShownotesStore } from '@/stores/ShownotesStore';
import { useEngineStore } from '@/stores/EngineStore';

export const useCantabileApi = defineStore('cantabileApi', {
  state: () => ({
    api: {} as CantabileApi,
    connectionState: 'Disconnected',

    preferencesStore: usePreferencesStore(),
    applicationStore: useApplicationStore(),
    bindingsStore: useBindingsStore(),
    transportStore: useTransportStore(),
    setlistStore: useSetlistStore(),
    songpartsStore: useSongpartsStore(),
    songStore: useSongStore(),
    shownotesStore: useShownotesStore(),
    engineStore: useEngineStore(),

    listeners: [
      {
        event: 'connecting',
        action: 'setConnecting',
        listener: null,
      },
      {
        event: 'connected',
        action: 'setConnected',
        listener: null,
      },
      {
        event: 'disconnected',
        action: 'setDisconnected',
        listener: null,
      },
    ] as ListenSpec[],
  }),

  getters: {
    isConnected: (state) => {
      return state.connectionState == 'Connected';
    },
  },

  actions: {
    async connect(api: CantabileApi) {
      this.preferencesStore.open();
      for (const listen of this.listeners) {
        api.on(
          listen.event,
          (listen.listener = this[listen.action].bind(this)),
        );
      }
      api.connect();
      await api.untilConnected();

      this.api = api;

      this.applicationStore.open(this.api.application);
      this.bindingsStore.open(this.api.bindings4);
      this.transportStore.open(this.api.transport);
      this.setlistStore.open(this.api.setList);
      this.songpartsStore.open(this.api.songStates);
      this.songStore.open(this.api.song);
      this.shownotesStore.open(this.api.showNotes);
      this.engineStore.open(this.api.engine);
    },

    disconnect() {
      this.shownotesStore.close();
      this.songStore.close();
      this.songpartsStore.close();
      this.setlistStore.close();
      this.transportStore.close();
      this.bindingsStore.close();
      this.applicationStore.close();

      if (this.api) {
        for (const listen of this.listeners) {
          this.api.removeListener(listen.event, listen.listener);
        }
        this.api.disconnect();
      }
      this.api = {} as CantabileApi;
    },

    setConnecting() {
      this.connectionState = 'Connecting';
    },
    setConnected() {
      this.connectionState = 'Connected';
    },
    setDisconnected() {
      this.connectionState = 'Disconnected';
    },
  },
});
