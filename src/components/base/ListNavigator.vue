<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { type ListOption } from '@/types';

export default defineComponent({
  name: 'ListNavigator',
  props: {
    disabled: { type: Boolean, default: false },
    firstAction: { type: Function, required: true },
    previousAction: { type: Function, required: true },
    nextAction: { type: Function, required: true },
    lastAction: { type: Function, required: true },

    options: { type: Array<ListOption>, required: true },
    selected: { type: Number, default: -1 },
    action: Function as PropType<(item: number) => void>,
  },
});
</script>

<template>
  <BButtonToolbar>
    <BButtonGroup>
      <BButton
        :disabled="disabled"
        id="first"
        variant="outline-light"
        @click="firstAction"
      >
        <IBiSkipBackwardFill height="2em" />
      </BButton>
      <BButton
        :disabled="disabled"
        id="previous"
        variant="outline-light"
        @click="previousAction"
      >
        <IBiSkipStartFill height="2em" />
      </BButton>
      <BFormSelect
        class="mx-3"
        size="lg"
        id="select-option"
        :model-value="selected"
        :options="options"
        :v-model="selected"
        @update:model-value="action"
      />
      <BButton
        :disabled="disabled"
        id="next"
        variant="outline-light"
        @click="nextAction"
      >
        <IBiSkipEndFill height="2em" />
      </BButton>
      <BButton
        :disabled="disabled"
        id="last"
        variant="outline-light"
        @click="lastAction"
      >
        <IBiSkipForwardFill height="2em" />
      </BButton>
    </BButtonGroup>
  </BButtonToolbar>
</template>
