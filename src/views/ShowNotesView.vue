<script lang="ts">
import { useShownotesStore } from '@/stores/ShownotesStore';
import { mapStores } from 'pinia';

import ShowNotes from '@/components/ShowNotes.vue';

export default {
  name: 'ShowNotesView',
  components: { ShowNotes },
  computed: {
    ...mapStores(useShownotesStore),

    hasShowNotes: function () {
      return this.shownotesStore.showNoteItems.length > 0;
    },
  },
};
</script>

<template>
  <ShowNotes v-if="hasShowNotes" :items="shownotesStore.showNoteItems" />
  <BImg v-else src="/c-brand-alpha.png" fluid-grow></BImg>
</template>
