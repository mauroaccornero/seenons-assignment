<script setup lang="ts">
type Stop = {
  stop_id: number;
  name: string;
  time_start: string;
  time_end: string;
};

interface Props {
  stops: Stop[] | null;
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
          >{{ name }}
          <span class="time_start">{{ formatDate(time_start) }}</span> -
          <span class="time_end">{{ formatDate(time_end) }}</span>
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<style>
a {
  text-decoration: none;
  color: #42b883;
}
li {
  line-height: 1.5em;
  margin-bottom: 20px;
}
.time_start,
.time_end {
  font-weight: bold;
}
</style>
