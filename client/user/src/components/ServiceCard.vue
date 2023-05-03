<script>
export default {
  props: {
    service: { type: Object, required: true },
  },
  methods: {
    getImage(service) {
      return `http://localhost:3000/${service.image}`;
    },
  },
};
</script>
<template>
  <div class="border p-3 text-left">
    <div class="text-center p-1">
      <img :src="getImage(service)" style="width: 150px; height: 150px" />
    </div>
    <div class="p-1">
      <strong>Tên dịch vụ:</strong>
      {{ service.service_name }}
    </div>
    <div class="p-1">
      <strong>Thuốc đính kèm:</strong>
      {{ service.service_categories }}
    </div>
    <div class="p-1">
      <strong>Đơn giá:</strong>
      {{
        service.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      }}
    </div>
  </div>
</template>
