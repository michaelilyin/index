<template>
  <div class="schedule">
    <iframe class="schedule-frame" v-bind:src="src"></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Schedule extends Vue {
  src =
    "https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FMoscow&src=bWljaGFlbC5zLmlseWluQGdtYWlsLmNvbQ&src=cmNxOXRlMDNpYTA0aXAzb3MzNjhpdXZwbG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%237986CB&showTitle=0&showDate=1&showTabs=0&showCalendars=0&showTz=1&mode=WEEK";
}
</script>

<style scoped lang="scss">
.schedule {
  width: 100%;
}

.schedule-frame {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
