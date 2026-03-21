<script lang="ts">
import { defineComponent } from 'vue';
import { useCantabileApi } from '@/stores/CantabileApi';
import ShowNotesView from '@/views/ShowNotesView.vue';

export default defineComponent({
  name: 'App',
  components: { ShowNotesView },

  data: function () {
    return {
      cantabileApi: useCantabileApi(),
    };
  },

  mounted: function () {
    this.cantabileApi.connect(new globalThis.Cantabile());
  },

  beforeUnmount: function () {
    this.cantabileApi.disconnect();
  },
});
</script>

<template>
  <BApp no-orchestrator>
    <ShowNotesView />
    <RouterView />
  </BApp>
</template>
