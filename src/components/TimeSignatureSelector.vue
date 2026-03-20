<script lang="ts">
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { useMetronomeStore } from '@/stores/MetronomeStore';

export default defineComponent({
  name: 'TimeSignatureSelector',
  computed: {
    ...mapStores(useMetronomeStore),
  },
});
</script>

<template>
  <BNavbarNav fill>
    <BNavForm>
      <BButtonGroup>
        <BFormSpinbutton
          id="sBBeats"
          v-model="metronomeStore.numerator"
          min="2"
          max="12"
          @change="metronomeStore.selectNumerator($event)"
        />
        <BNavText class="mx-3">{{ metronomeStore.signature }}</BNavText>
        <BFormSpinbutton
          id="sBBeatp2"
          v-model="metronomeStore.denominatorp2"
          min="1"
          max="4"
          :formatter-fn="(value) => Math.pow(2, value)"
          @change="metronomeStore.selectDenominator($event)"
        />
      </BButtonGroup>
    </BNavForm>
  </BNavbarNav>
</template>
