<script setup lang="ts">
import { ref } from "vue";
import type IOrderItem from "@/common/interfaces/IOrderItem";
import ISSUES from "@/common/constants/issues";
import StatusIcon from "./StatusIcon.vue";

const props = defineProps<{
  order: IOrderItem;
}>();

const state = ref({
  order: props.order,
  showIssueForm: false,
  options: ISSUES,
});

const setOrder = (order: IOrderItem) => (state.value.order = order);
const toggleIssueFormVisibility = () =>
  (state.value.showIssueForm = !state.value.showIssueForm);

const increaseQuantity = async () => {
  await fetch(
    window.location.origin + "/api/order/" + props.order.order_id + "/increase",
    {
      method: "PATCH",
    }
  );
  setOrder({ ...state.value.order, quantity: state.value.order.quantity + 1 });
};

const decreaseQuantity = async () => {
  if (state.value.order.quantity > 1) {
    // will delete with 0
    await fetch(
      window.location.origin +
        "/api/order/" +
        props.order.order_id +
        "/decrease",
      {
        method: "PATCH",
      }
    );
    setOrder({
      ...state.value.order,
      quantity: state.value.order.quantity - 1,
    });
  }
};

const complete = async () => {
  await fetch(
    window.location.origin + "/api/order/" + props.order.order_id + "/complete",
    {
      method: "PATCH",
    }
  );
  setOrder({ ...state.value.order, status: 4 });
};

const translateIssue = () => {
  const issue = state.value.options.find(
    (o) => state.value.order && o.value === state.value.order.issue
  );
  return issue ? issue.label : null;
};
</script>

<template>
  <article
    :class="{
      card: true,
      'card-order': true,
      'card-placement': state.order.type === 1,
    }"
  >
    <div class="card-header order-card-header">
      <h1>
        {{ state.order.quantity }} x {{ state.order.stream_type }}
        {{ state.order.size }}L
        <StatusIcon :status="state.order.status" />
        <span class="order-type">{{
          state.order.type === 1 ? "Placement" : "Pickup"
        }}</span>
      </h1>
    </div>
    <div class="card-body">
      <div v-if="state.order.status !== 4">
        <p>Adjust quantity (if needed)</p>
        <div class="button-container-wrapper">
          <div class="button-container">
            <button @click="decreaseQuantity" class="circle">-</button>
            <div>{{ state.order.quantity }}</div>
            <button @click="increaseQuantity" class="circle">+</button>
          </div>
          <div class="button-container">
            <button @click="complete">Complete</button>
            <button class="warning" @click="toggleIssueFormVisibility">
              Report issue
            </button>
          </div>
        </div>
        <div v-if="state.order.issue !== null" class="warning-message">
          Warning:
          {{ translateIssue() }}
        </div>
        <div v-if="state.showIssueForm && state.order.issue === null">
          <select v-model="state.order.issue">
            <option
              v-for="option in state.options"
              :value="option.value"
              :key="option.value + option.label"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div v-else>Order completed!</div>
    </div>
  </article>
</template>
