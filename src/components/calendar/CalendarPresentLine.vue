<template>
  <div class="current-time"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component<{}, {}, {}, {}>("calendar-present-line", {});
</script>

<style lang="scss" scoped>
.current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
</style>
