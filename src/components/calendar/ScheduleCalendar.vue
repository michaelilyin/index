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
    :interval-style="intervalStyle"
    :events="events"
    @change="getEvents"
  >
    <!-- :event-color="getEventColor"-->
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
import Vue, { PropType } from "vue";
import CalendarPastOverlay from "@/components/calendar/CalendarPastOverlay.vue";
import CalendarPresentLine from "@/components/calendar/CalendarPresentLine.vue";
import {
  VCalendar,
  CalendarTimes,
  CalendarChangeEvent
} from "@/plugins/vuetify/calendar";
import { CalendarEvent, CalendarTimestamp } from "vuetify";

interface Data {
  weekday: number[];
  type: string;
  mode: string;
  focus: string;
  times: CalendarTimes | null;
  interval: number | null;
}

interface Methods {
  getCalendar(): VCalendar | null;
  getCurrentTime(): number;

  initUpdateTime(): void;
  stopUpdateTime(): void;
  scrollToTime(): void;

  getEvents(params: CalendarChangeEvent): void;
  intervalStyle(
    interval: CalendarTimestamp
  ): Record<string, string | undefined>;
}

interface Computed {
  nowY: string;
  locale: string;
  presentOverlayHeight: string;
}

interface Props {
  events: CalendarEvent[];
}

export default Vue.component<Data, Methods, Computed, Props>(
  "schedule-calendar",
  {
    data: () => ({
      weekday: [1, 2, 3, 4, 5],
      type: "week",
      mode: "stack",
      focus: "",
      ready: false,
      times: null,
      interval: null
    }),
    props: {
      events: Array as PropType<Array<CalendarEvent>>
    },
    computed: {
      nowY(): string {
        const times = this.times;
        const cal = this.getCalendar();
        return cal?.timeToY(times?.now ?? "-10") + "px" ?? "-10px";
      },
      locale(): string {
        return this.$vuetify.lang.current;
      },
      presentOverlayHeight(): string {
        const times = this.times;
        const cal = this.getCalendar();
        return cal?.timeToY(times?.now ?? "0") + "px" ?? "0px";
      }
    },
    methods: {
      getCalendar(): VCalendar | null {
        return (
          ((this.$refs as unknown) as { calendar: VCalendar }).calendar ?? null
        );
      },

      getCurrentTime(): number {
        const cal = this.getCalendar();
        return cal ? cal.times.now.hour * 60 + cal.times.now.minute : 0;
      },

      initUpdateTime(): void {
        this.times = this.getCalendar()?.times ?? null;

        this.interval = setInterval(() => {
          this.getCalendar()?.updateTimes();
          this.times = this.getCalendar()?.times ?? null;
        }, 60 * 1000);
      },
      stopUpdateTime(): void {
        if (this.interval != undefined) {
          clearInterval(this.interval);
        }
      },

      scrollToTime(): void {
        const time = this.getCurrentTime();
        const first = Math.max(0, time - (time % 30) - 30);

        this.getCalendar()?.scrollToTime(first);
      },

      getEvents(params: CalendarChangeEvent): void {
        this.$emit("period-change", params);
      },

      intervalStyle(
        interval: CalendarTimestamp
      ): Record<string, string | undefined> {
        const inactive =
          interval.weekday === 0 ||
          interval.weekday === 6 ||
          interval.hour < 10 ||
          interval.hour >= 19;
        const startOfHour = interval.minute === 0;
        const mid = "rgba(0,0,0,0.1)";

        return {
          backgroundColor: inactive ? "rgba(0,0,0,0.05)" : undefined,
          borderTop: startOfHour ? undefined : "1px dashed " + mid
        };
      }
    },

    mounted() {
      this.scrollToTime();
      this.initUpdateTime();
      this.$emit("title-change", this.getCalendar()?.title ?? "");
    },

    destroyed() {
      this.stopUpdateTime();
    },
    components: { CalendarPastOverlay, CalendarPresentLine }
  }
);
</script>
