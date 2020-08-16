<template>
  <div class="schedule-container">
    <calendar-toolbar></calendar-toolbar>
    <schedule-calendar class="schedule-calendar"></schedule-calendar>
    <!-- <v-calendar
      ref="calendar"
      class="schedule-calendar"
      v-model="focus"
      :events="events"
      :weekdays="weekday"
      :type="type"
      :event-overlap-mode="mode"
      :event-overlap-threshold="30"
      :interval-minutes="30"
      :first-interval="18"
      :interval-count="22"
      :interval-height="40"
      :interval-style="intervalStyle"
      :event-color="getEventColor"
      :locale="locale"
      @change="getEvents"
    >
      <template #day-body="{ date, week, present, past }">
        <calendar-past-overlay
          v-if="past"
          height="100%"
        ></calendar-past-overlay>

        <calendar-past-overlay
          v-if="present"
          :height="presentOverlayHeight"
        ></calendar-past-overlay>

        <calendar-present-line
          v-if="present"
          :style="{ top: nowY }"
        ></calendar-present-line>
      </template>
    </v-calendar>-->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CalendarTimestamp } from "vuetify";
import { DateTime } from "luxon";
import {
  CalendarChangeEvent,
  CalendarEvent,
  calendarTSToDate,
  VCalendar
} from "@/plugins/vuetify/calendar";
import { ApiEvent } from "@/models/api/event.model";
import { AppStore, moduleActionContext, rootActionContext } from "@/store";
import store from "@/store";

interface Data {
  weekday: number[];
  type: string;
  mode: string;
  ready: boolean;
  interval: number | null;
  focus: string;
}

interface Methods {
  scrollToTime(): void;
  getCurrentTime(): number;
  getEventColor(event: CalendarEvent): string;
  next(): void;
  prev(): void;
  setToday(): void;
  stopUpdateTime(): void;
  updateTime(): void;
  intervalStyle(
    interval: CalendarTimestamp
  ): Record<string, string | undefined>;
  getEvents(params: CalendarChangeEvent): void;
}

interface Computed {
  cal: VCalendar | null;
  nowY: string;
  locale: string;
  presentOverlayHeight: string;
  events: CalendarEvent[];
  title: string;
}

export default Vue.component<Data, Methods, Computed, {}>("schedule", {
  data: () => ({
    weekday: [1, 2, 3, 4, 5],
    type: "week",
    mode: "stack",
    ready: false,
    interval: null,
    focus: ""
  }),
  computed: {
    cal(): VCalendar | null {
      return ((this.$refs as unknown) as { calendar: VCalendar | null })
        .calendar;
    },
    nowY(): string {
      return this.cal?.timeToY(this.cal?.times.now ?? "-10") + "px";
    },
    locale(): string {
      return this.$vuetify.lang.current;
    },
    presentOverlayHeight(): string {
      return this.cal?.timeToY(this.cal?.times.now ?? "0") + "px";
    },
    events(): CalendarEvent[] {
      return (
        store.state.calendar.events?.map((item: ApiEvent) => {
          const start = DateTime.fromISO(item.start.dateTime);
          const end = DateTime.fromISO(item.end.dateTime);
          const event: CalendarEvent = {
            start: start.toJSDate(),
            end: end.toJSDate(),
            name: "Busy",
            timed: true,
            startLuxon: start,
            endLuxon: end
          };
          return event;
        }) ?? []
      );
    },
    title(): string {
      if (this.ready) {
        return this.cal?.title ?? "";
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.ready = true;
    this.scrollToTime();
    this.updateTime();
  },
  destroyed() {
    this.stopUpdateTime();
  },
  methods: {
    getEvents(params: CalendarChangeEvent): void {
      const from = calendarTSToDate(params.start)
        .startOf("day")
        .toISO() as string;
      const to = calendarTSToDate(params.end)
        .endOf("day")
        .toISO() as string;

      (store.dispatch.calendar as any).loadEvents({ from, to });
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
    },

    updateTime(): void {
      this.interval = setInterval(() => this.cal?.updateTimes(), 60 * 1000);
    },

    stopUpdateTime(): void {
      if (this.interval != undefined) {
        clearInterval(this.interval);
      }
    },

    setToday(): void {
      console.info(this.focus);
      this.focus = "";
    },

    prev(): void {
      this.cal?.prev();
    },

    next(): void {
      this.cal?.next();
    },

    getEventColor(event: CalendarEvent): string {
      return "rgba(25, 118, 210, 1)";
    },

    getCurrentTime(): number {
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },

    scrollToTime(): void {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal?.scrollToTime(first);
    }
  }
});
</script>

<style scoped lang="scss">
.schedule-container {
  position: relative;
  height: 100%;
}

.schedule-calendar {
  position: absolute;
  top: 64px;
  width: 100%;
  height: calc(100% - 64px);
}
</style>
