<script setup lang="ts">
import OrderItem from "@/views/OrderItem.vue";
import type IOrderItem from "@/common/interfaces/IOrderItem";

interface Props {
  orders: IOrderItem[] | null;
}

const props = defineProps<Props>();
</script>

<template>
  <main>
    <h1>Orders</h1>
    <div :if="props.orders">
      <OrderItem
        v-for="order in props.orders"
        :key="order.order_id"
        :order="order"
      />
    </div>
  </main>
</template>
