<script lang="ts">
import { defineComponent } from "vue";
import StopsListView from "@/views/StopsListView.vue";
import getItems from "@/api/getItems";
import type IStop from "@/common/interfaces/IStop";

interface IData {
  stops: IStop[] | null;
}

export default defineComponent({
  components: { StopsListView },
  data: (): IData => ({
    stops: null,
  }),

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const data = await getItems<IData>("/api/stops");
      this.stops = data.stops;
    },
  },
});
</script>

<template>
  <StopsListView :stops="stops" />
</template>
