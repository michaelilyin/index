<template>
  <v-toolbar flat color="white">
    <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
      Today
    </v-btn>
    <v-btn fab text small color="grey darken-2" @click="prev">
      <v-icon small>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn fab text small color="grey darken-2" @click="next">
      <v-icon small>mdi-chevron-right</v-icon>
    </v-btn>
    <v-toolbar-title>
      {{ title }}
    </v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";

export enum CalendarNavigateEvent {
  TODAY,
  NEXT,
  PREV
}

interface Methods {
  setToday(): void;
  prev(): void;
  next(): void;
}

interface Props {
  title: string;
}

export default Vue.component<{}, Methods, {}, Props>("calendar-toolbar", {
  props: {
    title: String
  },
  methods: {
    setToday(): void {
      this.$emit("navigate", CalendarNavigateEvent.TODAY);
    },
    prev(): void {
      this.$emit("navigate", CalendarNavigateEvent.PREV);
    },
    next(): void {
      this.$emit("navigate", CalendarNavigateEvent.NEXT);
    }
  }
});
</script>
