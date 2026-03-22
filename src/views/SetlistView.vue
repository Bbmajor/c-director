<script lang="ts">
import { mapStores } from 'pinia';
import { useSetlistStore } from '@/stores/SetlistStore';

import SongSelector from '@/components/SongSelector.vue';
import SongpartSelector from '@/components/SongpartSelector.vue';
import ListDropdown from '@/components/base/ListDropdown.vue';

export default {
  name: 'SetlistView',
  components: {
    SongSelector,
    SongpartSelector,
    ListDropdown,
  },
  computed: {
    ...mapStores(useSetlistStore),
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
      <ListDropdown
        :options="setlistStore.setlists"
        :selected="setlistStore.currentSetlist"
        :action="setlistStore.loadSetlist"
        title="Set List"
      />
      <SongSelector />
      <SongpartSelector />
    </BCollapse>
  </BNavbar>
</template>
