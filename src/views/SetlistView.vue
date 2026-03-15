<script>
import { mapStores } from 'pinia';
import { useSetlistStore } from '@/stores/SetlistStore';

import NavBarTitle from '@/components/base/NavBarTitle.vue';
import SongSelector from '@/components/SongSelector.vue';
import SongpartSelector from '@/components/SongpartSelector.vue';

export default {
  name: 'SetlistView',

  components: {
    NavBarTitle,
    SongSelector,
    SongpartSelector,
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
      <SongSelector />
      <NavBarTitle :title="setlistStore.setlistName" link="/" />
      <SongpartSelector />
    </BCollapse>
  </BNavbar>
</template>
