<script lang="ts">
import { defineComponent } from "vue";
import StopDetailView from "@/views/StopDetailView.vue";
import getItems from "@/api/getItems";
import type IStop from "@/common/interfaces/IStop";

interface IData {
  stop: IStop | null;
  stops: IStop[] | null;
  lastStop: IStop | null;
}

interface IStopData {
  stops: IStop[];
}

export default defineComponent({
  components: { StopDetailView },
  data: (): IData => ({
    stop: null,
    stops: null,
    lastStop: null,
  }),
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.stop = await getItems<IStop>("/api/stops/" + this.$route.params.id);

      const stopsData = await getItems<IStopData>("/api/stops");
      const notCompletedStop = stopsData.stops.filter(
        (stop) => stop.status !== 4
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
