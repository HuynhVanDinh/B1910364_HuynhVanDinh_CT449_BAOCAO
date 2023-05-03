<script>
export default {
  props: {
    user: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Tên bệnh nhân:</strong>
      {{ user.fullname }}
    </div>
    <div class="p-1">
      <strong>Số điện thoại:</strong>
      {{ user.phone }}
    </div>
    <div class="p-1">
      <strong>Email:</strong>
      {{ user.email }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ user.address }}
    </div>
  </div>
</template>
