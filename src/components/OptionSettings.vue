<script>
import { mapStores } from 'pinia';
import { usePreferencesStore } from '@/stores/PreferencesStore';

export default {
  name: 'OptionSettings',
  vModel: [],

  data: function () {
    return {};
  },

  computed: {
    ...mapStores(usePreferencesStore),
  },

  created: function () {
    this.vModel = this.preferencesStore.settings;
  },
};
</script>

<template>
  <BNavbarNav fill align="center">
    <BNavForm>
      <BFormCheckboxGroup
        id="checkbox-group-1"
        v-model="vModel"
        :options="preferencesStore.options"
        text-field="text"
        @update:model-value="preferencesStore.setSettings"
        name="flavour-1"
        switches
        size="lg"
      />
    </BNavForm>
  </BNavbarNav>
</template>
