<script lang="ts">
import { defineComponent } from "vue";
import StopsListView from "@/views/StopsListView.vue";

export default defineComponent({
  components: { StopsListView },
  data: () => ({
    stops: null,
  }),

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const data = await (
        await fetch(window.location.origin + "/api/stops")
      ).json();
      this.stops = data.stops;
    },
  },
});
</script>

<template>
  <StopsListView :stops="stops" />
</template>
