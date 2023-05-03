<template>
  <div class="row">
    <div class="col-md-8">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-8">
      <div class="row">
        <h4 class="col-8">
          <i class="fa fa-list icon" aria-hidden="true"></i>
          Danh sách các dịch vụ
        </h4>
        <div class="col-4">
          <button class="btn btn-sm btn-primary" @click="goToAddService">
            <i class="fas fa-plus"></i> Thêm dịch vụ mới
          </button>
        </div>
      </div>

      <ServiceList
        v-if="filteredServiceCount > 0"
        :services="filteredService"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có dịch vụ nào.</p>
    </div>
    <div class="col-md-4 text-center mt-5">
      <div v-if="activeService">
        <h4>
          Chi tiết dịch vụ
          <i class="fas fa-info-circle"></i>
        </h4>
        <ServiceCard :service="activeService" />
        <router-link
          :to="{
            name: 'editService',
            params: { id: activeService._id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span
          >
        </router-link>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import ServiceCard from "@/components/ServiceCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ServiceList from "@/components/ServiceList.vue";
import ServiceService from "@/services/service.service";

export default {
  components: {
    ServiceCard,
    InputSearch,
    ServiceList,
  },
  data() {
    return {
      services: [],

      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    serviceString() {
      return this.services.map((service) => {
        const { service_name, service_medicine, price } = service;
        return [service_name, service_medicine, price].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredService() {
      if (!this.searchText) return this.services;
      return this.services.filter((_service, index) =>
        this.serviceString[index].includes(this.searchText)
      );
    },

    activeService() {
      if (this.activeIndex < 0) return null;
      return this.filteredService[this.activeIndex];
    },
    filteredServiceCount() {
      return this.filteredService.length;
    },
    // Trả về số lượng service đã được chọn vào menu
    menuCount() {
      return this.menu.length;
    },

    // Tính tổng giá tiền của các món trong menu
    menuTotalPrice() {
      let total = 0;
      this.menu.forEach((service) => {
        total += service.price;
      });
      return total;
    },
  },
  methods: {
    async retrieveServices() {
      try {
        this.services = await ServiceService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveServices();
      this.activeIndex = -1;
    },
    goToAddService() {
      this.$router.push({ name: "addService" });
    },
  },
  mounted() {
    this.refreshList();
    const menuData = localStorage.getItem("menu");
    if (menuData) {
      this.menu = JSON.parse(menuData);
    }
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
