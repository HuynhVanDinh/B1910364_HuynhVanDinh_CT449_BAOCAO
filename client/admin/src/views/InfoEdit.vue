<template>
  <div class="container content w-50">
    <div>
      <h4 class="text-center">Thông tin cá nhân</h4>
      <InfoForm :info="filteredinfo" @updateInfo="updateInfo" />
      <p class="text-success">{{ message }}</p>
      <div class="mt-3 row justify-content-around align-items-center"></div>
    </div>
  </div>
</template>
<script>
import infoService from "../services/info.service";
import { object } from "yup";
import InfoForm from "../components/InfoForm.vue";

export default {
  components: {
    InfoForm,
  },
  data() {
    return {
      info: object,
      message: "",
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
    async updateInfo(data) {
      try {
        await infoService.update(data);
        this.message = "Thông tin cá nhân cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
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
</style>
