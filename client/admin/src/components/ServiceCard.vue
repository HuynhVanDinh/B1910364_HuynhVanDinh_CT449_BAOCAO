<script>
export default {
  props: {
    service: { type: Object, required: true },
  },
  methods: {},
};
</script>
<template>
  <div class="border p-3 text-left">
    <div class="p-1">
      <strong>Tên dịch vụ:</strong>
      {{ service.service_name }}
    </div>
    <div class="p-1">
      <strong>Thuốc đính kèm:</strong>
      {{ service.service_medicine }}
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
