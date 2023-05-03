<template>
  <div v-if="service" class="content">
    <h4 class="text-center">Sửa dịch vụ</h4>
    <ServiceForm
      :service="service"
      @submit:service="updateService"
      @delete:service="deleteService"
    />
    <p class="text-center text-success">{{ message }}</p>
  </div>
</template>
<script>
import ServiceForm from "@/components/ServiceForm.vue";
import ServiceService from "@/services/service.service";
export default {
  components: {
    ServiceForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      service: null,
      message: "",
    };
  },
  methods: {
    async getService(id) {
      try {
        this.service = await ServiceService.get(id);
        console.log(this.service);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateService(data) {
      try {
        await ServiceService.update(this.service._id, data);
        this.message = "Dịch vụ được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteService() {
      if (confirm("Bạn muốn xóa dịch vụ này?")) {
        try {
          await ServiceService.delete(this.service._id);
          this.$router.push({ name: "home" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getService(this.id);
    this.message = "";
  },
};
</script>
<style>
.content {
  position: relative;
  z-index: 1;
}
</style>
