<script>
import { useShownotesStore } from '@/stores/ShownotesStore';
import { mapStores } from 'pinia';

import ShowNotes from '@/components/ShowNotes.vue';

export default {
  name: 'ShowNotesView',
  components: { ShowNotes },

  data: function () {
    return {};
  },

  computed: {
    ...mapStores(useShownotesStore),

    hasShowNotes: function () {
      return this.shownotesStore.showNoteItems.length > 0;
    },
  },
};
</script>

<template>
  <ShowNotes v-if="hasShowNotes" />
  <BImg
    v-else
    src="/c-brand-alpha.png"
    fluid-grow
    :style="shownotesStore.imageStyles"
  ></BImg>
</template>
