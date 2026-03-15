<script>
import { mapStores } from 'pinia';
import { useCantabileStore } from '@/stores/CantabileStore';

import NavBarTitle from '@/components/base/NavBarTitle.vue';
import MainBarLeft from '@/components/MainBarLeft.vue';
import MainBarRight from '@/components/MainBarRight.vue';

export default {
  name: 'HomeView',

  components: {
    NavBarTitle,
    MainBarLeft,
    MainBarRight,
  },

  computed: {
    ...mapStores(useCantabileStore),
  },
};
</script>

<template>
  <BNavbar
    v-if="cantabileStore.isConnected"
    toggleable="md"
    fixed="bottom"
    variant="dark"
    v-b-color-mode="'dark'"
  >
    <BNavbarToggle target="bottom-collapse" />
    <BCollapse id="bottom-collapse" is-nav>
      <MainBarLeft />
      <NavBarTitle title="C-Director" link="/about" />
      <MainBarRight />
    </BCollapse>
  </BNavbar>
  <BNavbar v-else fixed="bottom" variant="dark" v-b-color-mode="'dark'">
    <NavBarTitle :title="cantabileStore.connectionState" />
  </BNavbar>
</template>
