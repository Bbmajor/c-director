<script>
import { useCantabileStore } from '@/stores/CantabileStore';
import ShowNotesView from '@/views/ShowNotesView.vue';

export default {
  name: 'App',
  components: { ShowNotesView },
  cantabileStore: null,

  data: function () {
    return {};
  },

  mounted: function () {
    this.cantabileStore = useCantabileStore();
    // eslint-disable-next-line no-undef
    this.cantabileStore.connect(new Cantabile());
  },

  beforeUnmount: function () {
    this.cantabileStore.disconnect();
  },
};
</script>

<template>
  <BApp>
    <ShowNotesView />
    <RouterView />
  </BApp>
</template>
