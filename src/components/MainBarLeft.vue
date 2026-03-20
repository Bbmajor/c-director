<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useSongStore } from '@/stores/SongStore';
import { useTransportStore } from '@/stores/TransportStore';

export default defineComponent({
  name: 'MainBarLeft',
  computed: {
    ...mapStores(useSongStore, useTransportStore),
  },
});
</script>

<template>
  <BNavbarNav fill>
    <BNavItem to="Setlist">
      <BNavText
        >{{ songStore.songName }} : {{ songStore.songpartName }}</BNavText
      >
    </BNavItem>
    <BNavItem to="Metronome">
      <BNavText
        >{{ transportStore.timeSignature }} -
        {{ transportStore.tempo }} bpm</BNavText
      >
    </BNavItem>
  </BNavbarNav>
</template>
