<script>
import { mapStores } from 'pinia';
import { useSongpartsStore } from '@/stores/SongpartsStore';

import ListNavigator from '@/components/base/ListNavigator.vue';

export default {
  name: 'SongpartSelector',

  data: function () {
    return {};
  },

  components: {
    ListNavigator,
  },

  computed: {
    ...mapStores(useSongpartsStore),
  },
};
</script>

<template>
  <BNavbarNav align="center">
    <ListNavigator
      :disabled="songpartsStore.disabled"
      :first-action="songpartsStore.first"
      :previous-action="songpartsStore.previous"
      :next-action="songpartsStore.next"
      :last-action="songpartsStore.last"
      :item-name="songpartsStore.currentPartName"
    />
  </BNavbarNav>
</template>
