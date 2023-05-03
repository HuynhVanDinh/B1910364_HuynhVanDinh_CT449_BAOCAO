<template>
  <div
    class="container content pt-3"
    style="padding-right: 0px; padding-left: 0px"
  >
    <div class="bg-primary" style="height: 4px"></div>
    <div class="bg-white p-2 row ml-0 mr-0">
      <img
        class="col-2"
        src="../assets/nhakhoa.png"
        alt=""
        style="height: 120px"
      />
      <div class="col-10 mt-3">
        <h1 class="text-primary">MTV</h1>
        <a href="/" class="navbar-brand text-info">
          <i class="fas fa-home mr-2" aria-hidden="true"></i>Hệ thống quản lý
          nha khoa
        </a>
      </div>
    </div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="mr-auto navbar-nav">
        <li class="nav-item">
          <router-link
            :to="{ name: 'home' }"
            class="nav-link btn btn-link btn-outline-primary mr-2"
          >
            <i class="fas fa-home"></i> Trang chủ
          </router-link>
        </li>
        <div class="navbar-nav" v-if="Auth">
          <li class="nav-item">
            <router-link
              :to="{ name: 'order' }"
              class="nav-link btn btn-link btn-outline-primary mr-2"
            >
              <i class="fa fa-clock" aria-hidden="true"></i> Lịch sử khám
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'service' }"
              class="nav-link btn btn-link btn-outline-primary mr-2"
            >
              <i class="fa fa-book" aria-hidden="true"></i> Quản lý dịch vụ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'info' }"
              class="nav-link btn btn-link btn-outline-primary"
            >
              <i class="fas fa-user"></i> Cá nhân
            </router-link>
          </li>
        </div>
      </div>
      <div class="navbar-nav" v-if="Auth">
        <li class="nav-item">
          <button
            @click="logOut"
            class="nav-link btn btn-link btn-outline-primary"
          >
            <i class="fa fa-power-off" aria-hidden="true"></i> Đăng xuất
          </button>
        </li>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import userService from "@/services/user.service";

export default {
  computed: {
    ...mapState(["Auth"]),
  },
  methods: {
    ...mapMutations(["setAuth"]),
    async logOut() {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        await userService.logout({ headers });
        localStorage.removeItem("token");
        this.setAuth(false);
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
