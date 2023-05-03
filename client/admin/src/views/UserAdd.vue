<template>
  <div class="content container w-50">
    <h4 class="text-center">Thêm bệnh nhân mới</h4>
    <UserFrom :user="{}" @submit:user="addUser" />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import UserFrom from "@/components/UserForm.vue";
import UserService from "@/services/user.service";
export default {
  components: {
    UserFrom,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async addUser(data) {
      try {
        await UserService.register(data);
        this.message = "Bệnh nhân được thêm thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.content {
  position: relative;
  z-index: 1; /* Đảm bảo nội dung bên trong không bị ẩn bởi layer mờ */
}
</style>
