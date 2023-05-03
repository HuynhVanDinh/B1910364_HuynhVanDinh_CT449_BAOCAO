<script>
export default {
  props: {
    services: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    getImage(service) {
      return `http://localhost:3000/${service.image}`;
    },
    formatCurrency(number) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return formatter.format(number);
    },
  },
};
</script>
<template>
  <div class="container">
    <select
      class="form-select"
      :value="activeIndex"
      @input="$emit('update:activeIndex', $event.target.value)"
    >
      <option
        v-for="(service, index) in services"
        :key="service._id"
        :value="index"
      >
        {{ service.service_name }} - {{ formatCurrency(service.price) }}
      </option>
    </select>
  </div>
</template>
