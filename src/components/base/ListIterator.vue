<script>
export default {
  name: 'ListIterator',

  props: {
    previousAction: { type: Function, required: true },
    nextAction: { type: Function, required: true },
    disabled: { type: Boolean, default: false },
    itemName: { type: String, default: '--' },
  },

  data() {
    return {};
  },
};
</script>

<template>
  <BButtonToolbar>
    <BButtonGroup>
      <BButton
        :disabled="disabled"
        id="previous"
        variant="outline-light"
        @click="previousAction"
      >
        <IBiSkipStartFill height="2em" />
      </BButton>
      <BButton variant="outline-light">{{ itemName }}</BButton>
      <BButton
        :disabled="disabled"
        id="next"
        variant="outline-light"
        @click="nextAction"
      >
        <IBiSkipEndFill height="2em" />
      </BButton>
    </BButtonGroup>
  </BButtonToolbar>
</template>
