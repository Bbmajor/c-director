<script>
import { mapStores } from 'pinia';
import { useMediaPlayerStore } from '@/stores/MediaPlayerStore';

import NavBarTitle from '@/components/base/NavBarTitle.vue';
import MediaSelector from '@/components/MediaSelector.vue';
import MediaPlayer from '@/components/MediaPlayer.vue';

export default {
  name: 'PlayerView',

  components: {
    NavBarTitle,
    MediaSelector,
    MediaPlayer,
  },

  computed: {
    ...mapStores(useMediaPlayerStore),
  },
};
</script>

<template>
  <BNavbar
    toggleable="md"
    fixed="bottom"
    variant="dark"
    v-b-color-mode="'dark'"
  >
    <BNavbarToggle target="bottom-collapse" />
    <BCollapse id="bottom-collapse" is-nav>
      <MediaSelector />
      <NavBarTitle :title="mediaplayerStore.player.name" />
      <MediaPlayer />
    </BCollapse>
  </BNavbar>
</template>
