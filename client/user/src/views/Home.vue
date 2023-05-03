<template>
  <div class="row">
    <div class="col-md-8">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-8">
      <div class="row">
        <h4 class="col-9">
          Tin tức/ Dịch vụ
          <i class="fas fa-address-book"></i>
        </h4>
        <div class="col-3 mb-3">
          <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
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
    <div class="col-md-4 mt-3">
      <div v-if="activeService" class="text-center">
        <h4>
          Chi tiết tin tức
          <i class="fas fa-address-card"></i>
        </h4>

        <ServiceCard :service="activeService" />
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
      menu: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    serviceString() {
      return this.services.map((service) => {
        const { service_name, service_categories, price } = service;
        return [service_name, service_categories, price].join("");
      });
    },
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
    menuCount() {
      return this.menu.length;
    },

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
