<template>
  <v-calendar
    ref="calendar"
    v-model="focus"
    :weekdays="weekday"
    :type="type"
    :event-overlap-mode="mode"
    :event-overlap-threshold="30"
    :interval-minutes="30"
    :first-interval="18"
    :interval-count="22"
    :interval-height="40"
    :locale="locale"
  >
    <!-- :interval-style="intervalStyle"
    :event-color="getEventColor"-->
    <!-- :events="events" -->
    <!-- @change="getEvents" -->
    <template #day-body="{ present, past }">
      <calendar-past-overlay v-if="past" height="100%"></calendar-past-overlay>

      <calendar-past-overlay
        v-if="present"
        :height="presentOverlayHeight"
      ></calendar-past-overlay>

      <calendar-present-line
        v-if="present"
        :style="{ top: nowY }"
      ></calendar-present-line>
    </template>
  </v-calendar>
</template>

<script lang="ts">
import Vue from "vue";
import CalendarPastOverlay from "@/components/calendar/CalendarPastOverlay.vue";
import CalendarPresentLine from "@/components/calendar/CalendarPresentLine.vue";
import { VCalendar } from "@/plugins/vuetify/calendar";

interface Data {
  weekday: number[];
  type: string;
  mode: string;
  //   interval: number | null;
  focus: string;
  ready: boolean;
}

interface Computed {
  cal: VCalendar | null;
  nowY: string;
  locale: string;
  presentOVerlayHeight: string;
}

export default Vue.component<Data, {}, Computed, {}>("schedule-calendar", {
  data: () => ({
    weekday: [1, 2, 3, 4, 5],
    type: "week",
    mode: "stack",
    focus: "",
    ready: false
  }),
  computed: {
    cal(): VCalendar | null {
      return this.ready
        ? ((this.$refs as unknown) as { calendar: VCalendar }).calendar
        : null;
    },
    nowY(): string {
      return this.cal?.timeToY(this.cal?.times.now ?? "-10") + "px";
    },
    locale(): string {
      return this.$vuetify.lang.current;
    },
    presentOVerlayHeight(): string {
      return this.cal?.timeToY(this.cal?.times.now ?? "0") + "px";
    }
  },
  methods: {
    title(): string {
      return "";
    }
  },
  components: { CalendarPastOverlay, CalendarPresentLine }
});
</script>
