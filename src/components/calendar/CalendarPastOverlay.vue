<template>
  <div class="past-overlay" :style="{ height: this.height }"></div>
</template>

<script lang="ts">
import Vue from "vue";

// interface Data {
//   // cal: VCalendar | null;
// }

// interface Methods {}

// interface Computed {
//   pastOverlayHeight: string;
//   height: string;
// }

interface Props {
  height: string;
}

export default Vue.component<{}, {}, {}, Props>("calendar-past-overlay", {
  props: {
    height: String
  }
});
</script>

<style lang="scss" scoped>
.past-overlay {
  position: absolute;
  width: 100%;
  top: 0;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
