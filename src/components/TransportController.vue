<script>
import { mapStores } from 'pinia';
import { useTransportStore } from '@/stores/TransportStore';

import PlayControl from '@/components/base/PlayControl.vue';

export default {
  name: 'TransportController',

  components: {
    PlayControl,
  },

  data: function () {
    return {};
  },

  computed: {
    ...mapStores(useTransportStore),
  },
};
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
