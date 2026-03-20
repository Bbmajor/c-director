<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useMetronomeStore } from '@/stores/MetronomeStore';

export default defineComponent({
  name: 'TempoSelector',
  computed: {
    ...mapStores(useMetronomeStore),
  },
  methods: {
    toggleSounds() {
      this.metronomeStore.enableSounds(!this.metronomeStore.soundsEnabled);
    },
  },
});
</script>

<template>
  <BNavbarNav fill>
    <BNavItem>
      <BButton id="sound" pill variant="outline-light" @click="toggleSounds">
        <IBiVolumeUp v-if="metronomeStore.soundsEnabled" height="2em" />
        <IBiVolumeMute v-else height="2em" />
      </BButton>
    </BNavItem>
    <BNavItem class="mx-3">
      <BFormSpinbutton
        id="sb-tempo-index"
        v-model="metronomeStore.tempo"
        min="5"
        max="300"
        :formatter-fn="(value: number) => value + ' bpm'"
        @change="metronomeStore.selectTempo"
      />
    </BNavItem>
  </BNavbarNav>
</template>
