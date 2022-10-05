<script lang="ts">
import { defineComponent } from "vue";
import OrderListView from "@/views/OrderListView.vue";
import getItems from "@/api/getItems";
import type IOrderItem from "@/common/interfaces/IOrderItem";

interface IData {
  orders: IOrderItem[] | null;
}

export default defineComponent({
  components: { OrderListView },
  data: (): IData => ({
    orders: null,
  }),

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.orders = await getItems<IOrderItem[]>(
        "/api/stops/" + this.$route.params.id + "/orders"
      );
    },
  },
});
</script>

<template>
  <OrderListView :orders="orders" />
</template>
