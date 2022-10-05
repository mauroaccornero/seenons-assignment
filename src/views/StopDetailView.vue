<script setup lang="ts">
import router from "../router/index";
import StatusIcon from "./StatusIcon.vue";
import type IStop from "@/common/interfaces/IStop";

interface Props {
  stop: IStop | null;
  lastStop: IStop | null;
  stops: IStop[] | null;
}

const props = defineProps<Props>();

const formatTime = (date: string): string => {
  const dateTime = new Date(date);
  return dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const navigateToOrders = (stop: IStop | null): void => {
  if (stop && "stop_id" in stop) {
    router.push(`/stop/${stop.stop_id}/orders`);
  }
};
</script>

<template>
  <main v-if="props.stop">
    <div class="card">
      <div class="card-header stops-card-header">
        <div>
          <h1>
            {{ props.stop.name }} <StatusIcon :status="props.stop.status" />
          </h1>
          <h2>
            {{ props.stop.address.street }}
            {{ props.stop.address.house_number }}
            {{ props.stop.address.postal_code }}
            {{ props.stop.address.country }}
            {{ props.stop.address.town }}
          </h2>
        </div>
        <h3>
          {{ formatTime(props.stop.time_start) }} -
          {{ formatTime(props.stop.time_end) }}
        </h3>
      </div>
      <div class="card-body">
        <div>
          <h4>Orders {{ props.stop.orders.length }}</h4>
          <ul class="chips">
            <li
              class="chip"
              v-for="{ quantity, order_id, stream_type, type, size } in props
                .stop.orders"
              :key="order_id"
            >
              {{ type === 1 ? "Drop off" : "Pickup" }} {{ quantity }} x
              {{ size }}L
              {{ stream_type }}
            </li>
          </ul>
        </div>

        <div v-if="props.stop && props.stop.comment" class="special-box">
          <strong>Comments:</strong>
          <div>
            {{ props.stop.comment }}
          </div>
        </div>

        <div v-if="props.stop && props.stop.telephone" class="special-box">
          <strong>Contacts:</strong>
          <div>
            <a :href="`tel:${props.stop.telephone}`">{{
              props.stop.telephone
            }}</a>
          </div>
        </div>

        <div class="special-box">
          <strong>
            1 stop out of {{ props.stops ? props.stops.length : 0 }} left,
            <span v-if="props.lastStop">here's the last stop:</span>
          </strong>
          <div v-if="props.lastStop">
            {{ props.lastStop.address.street }}
            {{ props.lastStop.address.house_number }} <br />
            {{ props.lastStop.address.postal_code }}
            {{ props.lastStop.address.country }}
            {{ props.lastStop.address.town }}
          </div>
        </div>
        <div class="button-container right">
          <button @click="navigateToOrders(props.stop)">Proceed</button>
        </div>
      </div>
    </div>
  </main>
</template>
