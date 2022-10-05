<script setup lang="ts">
import type IStop from "@/common/interfaces/IStop";

interface Props {
  stops: IStop[] | null;
}

const props = defineProps<Props>();

const formatDate = (date: string): string => {
  const dateTime = new Date(date);
  return dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();
};
</script>

<template>
  <main>
    <h1>Stops list</h1>
    <ul :if="props.stops">
      <li
        v-for="{ stop_id, name, time_start, time_end } in props.stops"
        :key="stop_id"
      >
        <RouterLink :to="`stop/${stop_id}`"
          >{{ name }} <span>{{ formatDate(time_start) }}</span> -
          <span>{{ formatDate(time_end) }}</span>
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
