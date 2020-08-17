<template>
  <div class="schedule-container">
    <calendar-toolbar :title="title"></calendar-toolbar>
    <schedule-calendar
      :events="events"
      @period-change="getEvents"
      @title-change="setTitle"
      class="schedule-calendar"
    ></schedule-calendar>
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
import ScheduleCalendar from "@/components/calendar/ScheduleCalendar.vue";
import CalendarToolbar from "@/components/calendar/CalendarToolbar.vue";
import { CalendarActions } from "@/store/calendar";

interface Data {
  weekday: number[];
  type: string;
  mode: string;
  interval: number | null;
  focus: string;
  title: string;
}

interface Methods {
  getEventColor(event: CalendarEvent): string;
  next(): void;
  prev(): void;
  setToday(): void;
  getEvents(params: CalendarChangeEvent): void;
  setTitle(title: string): void;
}

interface Computed {
  cal: VCalendar | null;
  events: CalendarEvent[];
}

export default Vue.component<Data, Methods, Computed, {}>("schedule", {
  data: () => ({
    weekday: [1, 2, 3, 4, 5],
    type: "week",
    mode: "stack",
    ready: false,
    interval: null,
    focus: "",
    title: ""
  }),
  computed: {
    cal(): VCalendar | null {
      return ((this.$refs as unknown) as { calendar: VCalendar | null })
        .calendar;
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
    }
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

    setTitle(title: string): void {
      this.title = title;
    }
  },
  components: {
    ScheduleCalendar,
    CalendarToolbar
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
