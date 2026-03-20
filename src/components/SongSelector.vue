<script lang="ts">
import { mapStores } from 'pinia';
import { useSetlistStore } from '@/stores/SetlistStore';
import ListNavigator from '@/components/base/ListNavigator.vue';

export default {
  name: 'SongSelector',
  components: {
    ListNavigator,
  },
  computed: {
    ...mapStores(useSetlistStore),
  },
};
</script>

<template>
  <BNavbarNav align="center">
    <ListNavigator
      :first-action="setlistStore.first"
      :previous-action="setlistStore.previous"
      :next-action="setlistStore.next"
      :last-action="setlistStore.last"
      :item-name="setlistStore.currentSongName"
    />
  </BNavbarNav>
</template>
