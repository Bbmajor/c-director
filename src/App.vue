<script lang="ts">
import { defineComponent } from 'vue';
import { useCantabileStore } from '@/stores/CantabileStore';
import ShowNotesView from '@/views/ShowNotesView.vue';

export default defineComponent({
  name: 'App',
  components: { ShowNotesView },

  data: function () {
    return {
      cantabileStore: useCantabileStore(),
    };
  },

  mounted: function () {
    this.cantabileStore.connect(new globalThis.Cantabile());
  },

  beforeUnmount: function () {
    this.cantabileStore.disconnect();
  },
});
</script>

<template>
  <BApp no-orchestrator>
    <ShowNotesView />
    <RouterView />
  </BApp>
</template>
