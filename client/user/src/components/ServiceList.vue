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
  <div>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(service, index) in services"
        :key="service._id"
        :class="{ active: index === activeIndex }"
        @click="updateActiveIndex(index)"
      >
        <div class="mr-5 float-left">
          <img :src="getImage(service)" style="width: 50px; height: 50px" />
        </div>
        <b> Tên dịch vụ: </b>{{ service.service_name }}
        <br />
        <b> Đơn giá: </b>
        {{ formatCurrency(service.price) }}
      </li>
    </ul>
  </div>
</template>
