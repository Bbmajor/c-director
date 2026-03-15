<script>
import { mapStores } from 'pinia';
import { useMetronomeStore } from '@/stores/MetronomeStore';

export default {
  name: 'TimeSignatureSelector',

  data: function () {
    return {};
  },

  computed: {
    ...mapStores(useMetronomeStore),
  },

  methods: {
    beatsPerMeasure: function (value) {
      return Math.pow(2, value);
    },
  },
};
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
          :formatter-fn="(value) => beatsPerMeasure(value)"
          @change="metronomeStore.selectDenominator($event)"
        />
      </BButtonGroup>
    </BNavForm>
  </BNavbarNav>
</template>
