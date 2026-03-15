<script>
export default {
  name: 'PlayControl',

  props: {
    playAction: { type: Function, required: true },
    pauseAction: { type: Function, required: true },
    stopAction: { type: Function, required: true },
    playMode: { type: String, default: '' },
  },

  data() {
    return {};
  },

  computed: {
    stopped: function () {
      return this.playMode == 'stopped';
    },
    playing: function () {
      return this.playMode == 'playing';
    },
    paused: function () {
      return this.playMode == 'paused';
    },
    visible: function () {
      return this.playMode != '';
    },
  },
};
</script>

<template>
  <BNavForm>
    <BButtonGroup v-if="visible">
      <BButton
        id="play"
        pill
        variant="outline-light"
        :pressed="playing"
        :active="playing"
        :disabled="playing"
        @click="playAction"
      >
        <IBiPlayFill height="2em" />
      </BButton>
      <BButton
        id="pause"
        pill
        variant="outline-light"
        :pressed="paused"
        :active="paused"
        :disabled="stopped"
        @click="pauseAction"
      >
        <IBiPauseFill height="2em" />
      </BButton>
      <BButton
        id="stop"
        pill
        variant="outline-light"
        :pressed="stopped"
        :active="stopped"
        :disabled="stopped"
        @click="stopAction"
      >
        <IBiStopFill height="2em" />
      </BButton>
    </BButtonGroup>
  </BNavForm>
</template>
