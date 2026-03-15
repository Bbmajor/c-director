<script>
import { mapStores } from 'pinia';
import { useRecorderStore } from '@/stores/RecorderStore';

export default {
  name: 'RecorderController',

  data: function () {
    return {};
  },

  computed: {
    ...mapStores(useRecorderStore),
  },
};
</script>

<template>
  <BNavbarNav fill align="center">
    <BNavForm
      class="d-flex justify-content-center"
      @submit.stop.prevent="alert('Form Submitted')"
    >
      <BButtonGroup>
        <BButton
          variant="outline-light"
          pill
          :pressed="recorderStore.isRecording"
          @click="recorderStore.toggleRecording"
        >
          <IBiCircleFill height="2em" />
        </BButton>
        <BButton
          variant="outline-light"
          pill
          :pressed="recorderStore.isAutoRecord"
          @click="recorderStore.toggleAutoRecord"
        >
          <IBiDot height="2em" />
        </BButton>
      </BButtonGroup>
    </BNavForm>
  </BNavbarNav>
</template>
