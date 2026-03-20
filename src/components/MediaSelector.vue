<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useMediaPlayerStore } from '@/stores/MediaPlayerStore';
import ListIterator from '@/components/base/ListIterator.vue';

export default defineComponent({
  name: 'MediaSelector',
  components: { ListIterator },
  computed: {
    ...mapStores(useMediaPlayerStore),
  },
});
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
