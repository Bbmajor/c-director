<script lang="ts">
import { useCantabileApi } from '@/stores/CantabileApi';

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
  data: function () {
    return {
      cantabileApi: useCantabileApi(),
    };
  },
};
</script>

<template>
  <BNavbar
    v-if="cantabileApi.isConnected"
    toggleable="md"
    fixed="bottom"
    variant="dark"
    v-b-color-mode="'dark'"
  >
    <BNavbarToggle target="bottom-collapse" />
    <BCollapse id="bottom-collapse" is-nav>
      <MainBarLeft />
      <NavBarTitle title="C-Director" link="About" />
      <MainBarRight />
    </BCollapse>
  </BNavbar>
  <BNavbar v-else fixed="bottom" variant="dark" v-b-color-mode="'dark'">
    <NavBarTitle :title="cantabileApi.connectionState" />
  </BNavbar>
</template>
