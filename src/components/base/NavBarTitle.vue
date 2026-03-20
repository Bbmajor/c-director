<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavBarTitle',
  props: {
    title: { type: String, required: true },
    link: { type: String, default: '/' },
  },
});
</script>

<template>
  <BNavbarBrand :to="link">
    {{ title }}
  </BNavbarBrand>
</template>
