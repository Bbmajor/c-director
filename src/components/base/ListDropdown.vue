<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { type ListOption } from '@/types';

export default defineComponent({
  name: 'ListDropdown',
  props: {
    title: { type: String, required: true },
    link: { type: String, default: '/' },

    options: { type: Array<ListOption>, required: true },
    selected: { type: String, required: true },
    action: Function as PropType<(item: string) => void>,
  },
});
</script>

<template>
  <BNavbarBrand :to="link">
    {{ title }}
  </BNavbarBrand>
  <BFormSelect
    class="mx-3"
    size="lg"
    id="select-option"
    :model-value="selected"
    :options="options"
    :v-model="selected"
    @update:model-value="action"
  />
</template>
