<script>
import { mapStores } from 'pinia';
import { useRecorderStore } from '@/stores/RecorderStore';
import { useMediaPlayerStore } from '@/stores/MediaPlayerStore';

export default {
  name: 'MainBarRight',

  computed: {
    ...mapStores(useRecorderStore, useMediaPlayerStore),
  },
};
</script>

<template>
  <BNavbarNav fill>
    <BNavItem to="/transport">
      <BNavText>{{ recorderStore.recorderState }}</BNavText>
    </BNavItem>
    <BNavItem to="/player">
      <BNavText
        >{{ mediaplayerStore.file.name }} -
        {{ mediaplayerStore.range.name }}</BNavText
      >
    </BNavItem>
  </BNavbarNav>
</template>
