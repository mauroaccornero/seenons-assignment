<script setup lang="ts">
type Address = {
  street: string;
  house_number: string;
  postal_code: string;
  country: string;
  town: string;
};

type Order = {
  quantity: number;
  order_id: string;
  stream_type: string;
  type: number;
  size: number;
};

type Stop = {
  stop_id: number;
  name: string;
  time_start: string;
  time_end: string;
  status: number;
  address: Address;
  orders: Order[];
  telephone: string;
  comment: string;
};

interface Props {
  stop: Stop | null;
  lastStop: Stop | null;
  stops: Stop[] | null;
}

const props = defineProps<Props>();

const formatTime = (date: string): string => {
  const dateTime = new Date(date);
  return dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <main v-if="props.stop">
    <h1>{{ props.stop.name }}</h1>
    <h2>
      {{ props.stop.address.street }} {{ props.stop.address.house_number }}
      <br />
      {{ props.stop.address.postal_code }} {{ props.stop.address.country }}
      {{ props.stop.address.town }}
    </h2>
    <h3>
      {{ formatTime(props.stop.time_start) }} -
      {{ formatTime(props.stop.time_end) }}
    </h3>

    <div>
      <h4>Orders {{ props.stop.orders.length }}</h4>
      <ul>
        <li
          v-for="{ quantity, order_id, stream_type, type, size } in props.stop
            .orders"
          :key="order_id"
        >
          {{ type === 1 ? "Drop off" : "Pickup" }} {{ quantity }} x {{ size }}L
          {{ stream_type }}
        </li>
      </ul>
    </div>

    <div>
      <button>Itinerary</button>
      <button>Proceed</button>
    </div>
    <div>
      <h4>Comments:</h4>
      <p>
        {{ props.stop.comment ? props.stop.comment : "No additional comments" }}
      </p>
    </div>

    <div>
      Contacts:
      <div v-if="props.stop.telephone">
        <a :href="`tel:${props.stop.telephone}`">{{ props.stop.telephone }}</a>
      </div>
    </div>

    <div>
      <p>
        1 stop out of {{ props.stops ? props.stops.length : 0 }} left,
        <span v-if="props.lastStop">here's the last stop:</span>
      </p>
      <div v-if="props.lastStop">
        {{ props.lastStop.address.street }}
        {{ props.lastStop.address.house_number }} <br />
        {{ props.lastStop.address.postal_code }}
        {{ props.lastStop.address.country }}
        {{ props.lastStop.address.town }}
      </div>
    </div>
  </main>
</template>
