<script>
import { mapStores } from 'pinia';
import { useSongStore } from '@/stores/SongStore';
import { useTransportStore } from '@/stores/TransportStore';

export default {
  name: 'MainBarLeft',
  computed: {
    ...mapStores(useSongStore, useTransportStore),
  },
};
</script>

<template>
  <BNavbarNav fill>
    <BNavItem to="/setlist">
      <BNavText
        >{{ songStore.songName }} : {{ songStore.songpartName }}</BNavText
      >
    </BNavItem>
    <BNavItem to="/metronome">
      <BNavText
        >{{ transportStore.timeSignature }} -
        {{ transportStore.tempo }} bpm</BNavText
      >
    </BNavItem>
  </BNavbarNav>
</template>
