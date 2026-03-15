<script>
import { mapStores } from 'pinia';
import { useMediaPlayerStore } from '@/stores/MediaPlayerStore';
import ListIterator from './base/ListIterator.vue';

export default {
  name: 'MediaSelector',

  components: { ListIterator },

  data: function () {
    return {};
  },

  computed: {
    ...mapStores(useMediaPlayerStore),

    visible: function () {
      return this.mediaplayerStore.mediaState != '';
    },
  },
};
</script>

<template>
  <BNavbarNav fill align="center">
    <BNavForm class="mx-3"
      ><ListIterator
        :previous-action="mediaplayerStore.previousFile"
        :next-action="mediaplayerStore.nextFile"
        :item-name="mediaplayerStore.file.name"
    /></BNavForm>
    <BNavForm class="mx-3"
      ><ListIterator
        :previous-action="mediaplayerStore.previousPlayRange"
        :next-action="mediaplayerStore.nextPlayRange"
        :item-name="mediaplayerStore.range.name"
    /></BNavForm>
  </BNavbarNav>
</template>
