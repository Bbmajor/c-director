<script>
import { mapStores } from 'pinia';
import { useSetlistStore } from '@/stores/SetlistStore';

import ListNavigator from '@/components/base/ListNavigator.vue';

export default {
  name: 'SongSelector',

  data: function () {
    return {};
  },

  components: {
    ListNavigator,
  },

  computed: {
    ...mapStores(useSetlistStore),

    currentSongName() {
      if (this.setlistStore.currentSong) {
        return this.setlistStore.currentSong.name;
      } else {
        return 'No Song';
      }
    },
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
      :item-name="currentSongName"
    />
  </BNavbarNav>
</template>
