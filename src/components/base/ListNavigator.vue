<script>
export default {
  name: 'ListNavigator',

  props: {
    firstAction: { type: Function, required: true },
    previousAction: { type: Function, required: true },
    nextAction: { type: Function, required: true },
    lastAction: { type: Function, required: true },
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
      <BButton variant="outline-light">{{ itemName }}</BButton>
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
