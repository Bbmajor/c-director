<script lang="ts">
import NavBarTitle from '@/components/base/NavBarTitle.vue';
import TimeSignatureSelector from '@/components/TimeSignatureSelector.vue';
import TempoSelector from '@/components/TempoSelector.vue';

export default {
  name: 'MetronomeView',
  components: {
    NavBarTitle,
    TimeSignatureSelector,
    TempoSelector,
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
      <TimeSignatureSelector />
      <NavBarTitle title="Metronome" />
      <TempoSelector />
    </BCollapse>
  </BNavbar>
</template>
