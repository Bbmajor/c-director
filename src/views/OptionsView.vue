<script lang="ts">
import NavBarTitle from '@/components/base/NavBarTitle.vue';
import OptionSettings from '@/components/OptionSettings.vue';

export default {
  name: 'OptionsView',
  components: {
    NavBarTitle,
    OptionSettings,
  },
};
</script>

<template>
  <BNavbar
    toggleable="md"
    fixed="bottom"
    variant="dark"
    v-b-color-mode="'dark'"
  >
    <BNavbarToggle target="bottom-collapse" />
    <BCollapse id="bottom-collapse" is-nav>
      <NavBarTitle title="Options" link="About" />
      <OptionSettings />
    </BCollapse>
  </BNavbar>
</template>
