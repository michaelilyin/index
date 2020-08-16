<template>
  <div>
    <p>This is test component</p>
    <p>{{ dataTitle }} ({{ length }})</p>
    <button @click="message">Next message</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Data {
  dataTitle: string;
}

interface Computed {
  length: number;
}

interface Methods {
  message(): void;
}

export default Vue.component<Data, Methods, Computed, {}>("test", {
  data: () => ({
    dataTitle: "Dynamic title from data"
  }),
  computed: {
    length(): number {
      return this.dataTitle.length;
    }
  },
  methods: {
    message(): void {
      this.dataTitle = "Random message";
    }
  }
});
</script>
