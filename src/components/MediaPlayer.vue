<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import PlayControl from '@/components/base/PlayControl.vue';
import { useMediaPlayerStore } from '@/stores/MediaPlayerStore';

export default defineComponent({
  name: 'MediaPlayer',
  components: {
    PlayControl,
  },
  computed: {
    ...mapStores(useMediaPlayerStore),
  },
});
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
