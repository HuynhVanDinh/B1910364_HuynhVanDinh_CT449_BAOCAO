<template>
  <div class="container content">
    <div>
      <h4 class="text-center">Thông tin cá nhân</h4>
      <Info :info="filteredinfo" />
      <div class="mt-3 row justify-content-around align-items-center">
        <router-link
          :to="{
            name: 'updateInfo',
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Cập nhật thông tin</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Info from "@/components/Info.vue";
import infoService from "../services/info.service";
import { object } from "yup";

export default {
  components: {
    Info,
  },
  data() {
    return {
      info: object,
    };
  },
  watch: {},

  computed: {
    filteredinfo() {
      return this.info;
    },
  },
  methods: {
    async retrieveInfo() {
      try {
        this.info = await infoService.info();
        console.log(this.info);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveInfo();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
@import "@/assets/form-login.css";
</style>
