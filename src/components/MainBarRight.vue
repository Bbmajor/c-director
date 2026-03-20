<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useRecorderStore } from '@/stores/RecorderStore';
import { useMediaPlayerStore } from '@/stores/MediaPlayerStore';

export default defineComponent({
  name: 'MainBarRight',
  computed: {
    ...mapStores(useMediaPlayerStore, useRecorderStore),
  },
});
</script>

<template>
  <BNavbarNav fill>
    <BNavItem to="Transport">
      <BNavText>{{ recorderStore.recorderState }}</BNavText>
    </BNavItem>
    <BNavItem to="Player">
      <BNavText
        >{{ mediaplayerStore.file.name }} -
        {{ mediaplayerStore.range.name }}</BNavText
      >
    </BNavItem>
  </BNavbarNav>
</template>
