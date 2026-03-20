import { defineStore } from 'pinia';
import { type CantabileEventEmitter, type ListenSpec } from '@/types';

import { usePreferencesStore } from '@/stores/PreferencesStore';
import { useApplicationStore } from '@/stores/ApplicationStore';
import { useBindingsStore } from '@/stores/BindingsStore';
import { useTransportStore } from '@/stores/TransportStore';
import { useSetlistStore } from '@/stores/SetlistStore';
import { useSongpartsStore } from '@/stores/SongpartsStore';
import { useSongStore } from '@/stores/SongStore';
import { useShownotesStore } from '@/stores/ShownotesStore';

export const useCantabileStore = defineStore('cantabile', {
  state: () => ({
    endPoint: {} as CantabileEventEmitter,
    connectionState: 'Disconnected',

    preferencesStore: usePreferencesStore(),
    applicationStore: useApplicationStore(),
    bindingsStore: useBindingsStore(),
    transportStore: useTransportStore(),
    setlistStore: useSetlistStore(),
    songpartsStore: useSongpartsStore(),
    songStore: useSongStore(),
    shownotesStore: useShownotesStore(),

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
    async connect(endPoint: CantabileEventEmitter) {
      this.preferencesStore.open();
      for (const listen of this.listeners) {
        endPoint.on(
          listen.event,
          (listen.listener = this[listen.action].bind(this)),
        );
      }
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

      if (this.endPoint) {
        for (const listen of this.listeners) {
          this.endPoint.removeListener(listen.event, listen.listener);
        }
        this.endPoint.disconnect();
      }
      this.endPoint = {} as CantabileEventEmitter;
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
