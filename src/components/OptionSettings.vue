<script lang="ts">
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { usePreferencesStore } from '@/stores/PreferencesStore';
import { type OptionKey } from '@/types';

export default defineComponent({
  name: 'OptionSettings',
  data: function () {
    return { selected: [] as OptionKey[] };
  },

  computed: {
    ...mapStores(usePreferencesStore),
  },

  created: function () {
    this.selected = this.preferencesStore.settings;
  },
});
</script>

<template>
  <BNavbarNav fill align="center">
    <BNavForm>
      <BFormCheckboxGroup
        id="checkbox-group-1"
        v-model="selected"
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
