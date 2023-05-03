<template>
  <div class="content">
    <h2 class="text-center text-primary font-weight-bold mb-2">Đăng ký</h2>
    <div class="w-50 rounded bg-login container p-4">
      <RegisterForm @submit:register="submitRegister" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm.vue";
import userService from "@/services/user.service";

export default {
  components: {
    RegisterForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async submitRegister(data) {
      try {
        await userService.register(data);
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
        this.message = "Đăng ký thất bại. Vui lòng thử lại.";
      }
    },
  },
};
</script>
<style>
.content {
  position: relative;
  z-index: 1;
}
.bg-login {
  background-color: rgba(238, 238, 238);
  padding: 7px;
}
</style>
