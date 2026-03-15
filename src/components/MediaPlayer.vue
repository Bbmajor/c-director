<script>
import PlayControl from '@/components/base/PlayControl.vue';
import { mapStores } from 'pinia';
import { useMediaPlayerStore } from '@/stores/MediaPlayerStore';

export default {
  name: 'MediaPlayer',

  components: {
    PlayControl,
  },

  data: function () {
    return {};
  },

  computed: {
    ...mapStores(useMediaPlayerStore),
  },
};
</script>

<template>
  <BNavbarNav fill align="center">
    <PlayControl
      :play-mode="mediaplayerStore.mediaState"
      :play-action="mediaplayerStore.play"
      :pause-action="mediaplayerStore.pause"
      :stop-action="mediaplayerStore.stop"
    />
  </BNavbarNav>
</template>
