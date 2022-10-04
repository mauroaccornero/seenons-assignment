<script lang="ts">
import { defineComponent } from "vue";
import StopDetailView from "@/views/StopDetailView.vue";

type Stop = {
  status: number;
};

export default defineComponent({
  components: { StopDetailView },
  data: () => ({
    stop: null,
    stops: null,
    lastStop: null,
  }),
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.stop = await (
        await fetch(window.location.origin + "/api/stops/" + this.$route.params.id)
      ).json();
      const stopsData = await (
        await fetch(window.location.origin + "api/stops")
      ).json();
      const notCompletedStop = stopsData.stops.filter(
        (stop: Stop) => stop.status !== 4
      );
      this.stops = notCompletedStop;
      this.lastStop = notCompletedStop[notCompletedStop.length - 1];
    },
  },
});
</script>

<template>
  <StopDetailView :stop="stop" :lastStop="lastStop" :stops="stops" />
</template>
