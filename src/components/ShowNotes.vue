<script>
import { mapStores } from 'pinia';
import { usePreferencesStore } from '@/stores/PreferencesStore';
import { useShownotesStore } from '@/stores/ShownotesStore';

export default {
  name: 'ShowNotes',
  data: function () {
    return { slide: 0 };
  },

  props: {},

  computed: {
    ...mapStores(usePreferencesStore, useShownotesStore),

    showControls: function () {
      return this.shownotesStore.showNoteItems.length > 1;
    },

    isImage: function () {
      return this.isText == false;
    },

    imageStyles: function () {
      return this.preferencesStore.invertImage ? { filter: 'invert(1)' } : {};
    },
  },

  methods: {
    htmlText: function (item) {
      var content = item.text.content;
      if (content) {
        if (this.preferencesStore.markdownEnabled) {
          // uses app.config.globalProperties.$MD
          var mdd = new this.$MD.Markdown();
          mdd.ExtraMode = true;
          return mdd.Transform(content);
        } else {
          return content;
        }
      } else {
        return '';
      }
    },
  },
};
</script>

<template>
  <BCarousel
    id="carousel-1"
    background="#000000"
    no-animation
    v-model="slide"
    interval="0"
    :controls="showControls"
  >
    <BCarouselSlide
      v-for="(item, index) in shownotesStore.showNoteItems"
      :key="index"
      :background="item.backgroundColor"
      :img-src="item.image.url"
      :style="imageStyles"
      ><p>{{ htmlText(item) }}</p></BCarouselSlide
    >
  </BCarousel>
</template>
