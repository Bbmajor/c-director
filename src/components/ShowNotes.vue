<script lang="ts">
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { usePreferencesStore } from '@/stores/PreferencesStore';
import markdownit from 'markdown-it';

const mdit = markdownit();

export default defineComponent({
  name: 'ShowNotes',

  data: function () {
    return {
      slide: 0,
    };
  },

  props: {
    items: { type: Object, required: true },
  },

  computed: {
    ...mapStores(usePreferencesStore),

    invertImage: (state) => {
      return state.preferencesStore.invertImage;
    },

    markdownEnabled: (state) => {
      return state.preferencesStore.markdownEnabled;
    },

    imageStyles: (state) => {
      return state.preferencesStore.invertImage ? { filter: 'invert(1)' } : {};
    },
  },

  methods: {
    showControls() {
      return this.items.length > 1;
    },

    url: (image) => {
      return image ? image.url : '';
    },

    content: (text) => {
      return text ? text.content : '';
    },

    textStyles(text) {
      return text ? { color: text.color } : {};
    },

    isText(item) {
      return item.image.url ? false : true;
    },

    htmlText(content) {
      if (content) {
        if (this.markdownEnabled) {
          return mdit.render(content);
        } else {
          return content;
        }
      } else {
        return '';
      }
    },
  },
});
</script>

<template>
  <BCarousel
    id="carousel-1"
    background="#000000"
    no-animation
    v-model="slide"
    interval="0"
    :controls="showControls()"
  >
    <BCarouselSlide
      v-for="(item, index) in items"
      :key="index"
      :background="item.backgroundColor"
      :img-src="url(item.image)"
      :img-blank="item.isText"
      :img-width="item.image.width || 1280"
      ><p v-if="item.isText" v-html="htmlText(content(item.text))" />
    </BCarouselSlide>
  </BCarousel>
</template>
