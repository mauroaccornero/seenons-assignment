<script setup lang="ts">
import TruckFastIcon from "vue3-material-design-icons-ts/dist//TruckFast.vue";
import ClockOutlineIcon from "vue3-material-design-icons-ts/dist//ClockOutline.vue";
import CalendarCheckIcon from "vue3-material-design-icons-ts/dist//CalendarCheck.vue";
import CheckBoldIcon from "vue3-material-design-icons-ts/dist//CheckBold.vue";
import AlertCircleIcon from "vue3-material-design-icons-ts/dist//AlertCircle.vue";

interface Props {
  status: number;
}

const props = defineProps<Props>();
</script>

<template>
  <alert-circle-icon v-if="props.status === 0" />
  <clock-outline-icon v-if="props.status === 1" />
  <calendar-check-icon v-if="props.status === 2" />
  <truck-fast-icon v-if="props.status === 3" />
  <check-bold-icon v-if="props.status === 4" />
</template>
