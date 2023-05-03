<template>
  <div class="content">
    <div class="container">
      <h3 class="text-center">Thông tin cá nhân</h3>
      <Info :info="filteredinfo" />

      <div class="mt-3 row justify-content-around align-items-center">
        <router-link
          :to="{
            name: 'updateInfo',
            // query: { id_user: info._id }
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
.content {
  position: relative;
  z-index: 1; /* Đảm bảo nội dung bên trong không bị ẩn bởi layer mờ */
}
.page {
  text-align: left;
  max-width: 750px;
}
</style>
