<script>
import { mapStores } from 'pinia';
import { useMetronomeStore } from '@/stores/MetronomeStore';

export default {
  name: 'TempoSelector',

  data: function () {
    return {};
  },

  computed: {
    ...mapStores(useMetronomeStore),
  },
};
</script>

<template>
  <BNavbarNav fill>
    <BNavItem>
      <BFormCheckbox
        switch
        id="checkbox-sound"
        :v-model="metronomeStore.soundsEnabled"
        @update:model-value="metronomeStore.enableSounds"
        >Enable Sounds</BFormCheckbox
      >
    </BNavItem>
    <BNavItem>
      <BNavText class="mx-3">{{ metronomeStore.tempo }} bpm</BNavText>
    </BNavItem>
    <BNavItem>
      <BFormSpinbutton
        id="sb-tempo-index"
        v-model="metronomeStore.tempo"
        min="5"
        max="300"
        @change="metronomeStore.selectTempo"
      />
    </BNavItem>
  </BNavbarNav>
</template>
