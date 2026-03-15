<script>
export default {
  name: 'NavBarTitle',

  props: {
    title: { type: String, required: true },
    link: { type: String, default: '/' },
  },

  data() {
    return {};
  },
};
</script>

<template>
  <BNavbarBrand :to="link">
    {{ title }}
  </BNavbarBrand>
</template>
