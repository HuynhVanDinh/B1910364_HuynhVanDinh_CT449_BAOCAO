<template>
  <div class="content">
    <h4 class="text-center">Thêm dịch vụ</h4>
    <ServiceForm :service="{}" @submit:service="addService" />
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

  data() {
    return {
      message: "",
    };
  },
  methods: {
    async addService(data) {
      try {
        await ServiceService.create(data);
        this.message = "Dịch vụ được thêm thành công.";
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
  z-index: 1;
}
</style>
