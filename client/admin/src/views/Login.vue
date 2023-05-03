<template>
  <div class="content">
    <h2 class="text-center text-primary font-weight-bold mb-2">Đăng nhập</h2>
    <div class="w-50 rounded bg-login container p-4">
      <LoginForm @submit:login="submitLogin" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import userService from "@/services/user.service";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState(["Auth"]),
  },
  methods: {
    ...mapMutations(["setAuth"]),

    async submitLogin(data) {
      try {
        const response = await userService.login(data);
        console.log("response: ", response);
        localStorage.setItem("token", response.token);
        this.setAuth(true);
        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
        this.message = "Đăng nhập thất bại. Vui lòng thử lại.";
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
