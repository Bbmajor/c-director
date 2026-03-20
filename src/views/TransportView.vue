<script lang="ts">
import NavBarTitle from '@/components/base/NavBarTitle.vue';
import RecorderController from '@/components/RecorderController.vue';
import TransportController from '@/components/TransportController.vue';

export default {
  name: 'TransportView',
  components: {
    NavBarTitle,
    RecorderController,
    TransportController,
  },
};
</script>

<template>
  <b-navbar
    toggleable="md"
    fixed="bottom"
    variant="dark"
    v-b-color-mode="'dark'"
  >
    <b-navbar-toggle target="bottom-collapse" />
    <b-collapse id="bottom-collapse" is-nav>
      <RecorderController />
      <NavBarTitle title="Transport" />
      <TransportController />
    </b-collapse>
  </b-navbar>
</template>
