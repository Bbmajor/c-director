<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useTransportStore } from '@/stores/TransportStore';

import PlayControl from '@/components/base/PlayControl.vue';

export default defineComponent({
  name: 'TransportController',
  components: {
    PlayControl,
  },
  computed: {
    ...mapStores(useTransportStore),
  },
});
</script>

<template>
  <BNavbarNav fill align="center">
    <PlayControl
      :play-mode="transportStore.mediaState"
      :play-action="transportStore.play"
      :pause-action="transportStore.pause"
      :stop-action="transportStore.stop"
    />
  </BNavbarNav>
</template>
