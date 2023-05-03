<template>
  <div>
    <div class="row">
      <div class="col-5">
        <InputSearch v-model="searchText" />
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <div>
          <h4 class="mt-3">
            Điều trị
            <i class="fa fa-notes-medical icon" aria-hidden="true"></i>
          </h4>
        </div>
        <div>
          <label for="service-dropdown">Chọn dịch vụ:</label>
          <serviceDropDown
            v-if="filteredServiceCount > 0"
            :services="filteredService"
            v-model:activeIndex="activeIndex"
            id="service-dropdown"
          />
          <p v-else>Không có món ăn nào.</p>
        </div>
        <div class="mt-2">
          <div v-if="activeService">
            <h4>
              Chi tiết dịch vụ
              <i class="fas fa-address-card"></i>
            </h4>
            <ServiceCard :service="activeService" />
            <button
              class="btn btn-sm btn-primary mt-2"
              @click="addServiceToMenu()"
            >
              <i class="fas fa-add"></i> Thêm vào hoá đơn
            </button>
            <div></div>
          </div>
        </div>
      </div>
      <div class="col-9"><Menu :menu="menu" :id="this.id"></Menu></div>
    </div>
  </div>
</template>
<script>
import ServiceCard from "@/components/ServiceCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ServiceService from "@/services/service.service";
import ServiceDropDown from "../components/ServiceDropDown.vue";
import Menu from "@/components/Menu.vue";
import { object } from "yup";

export default {
  components: {
    ServiceCard,
    InputSearch,
    ServiceDropDown,
    Menu,
  },
  props: {
    id: { type: object, required: true },
  },
  data() {
    return {
      // id: object,
      services: [],
      menu: [],
      activeIndex: -1,

      total1: "",
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
        const { service_name, service_categories, price } = service;
        return [service_name, service_categories, price].join("");
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
    async addServiceToMenu() {
      if (this.activeService) {
        // Kiểm tra xem món ăn đã có trong menu hay chưa
        const existingService = this.menu.find(
          (service) => service._id === this.activeService._id
        );
        if (existingService) {
          // Nếu món ăn đã có trong menu thì tăng số lượng lên 1
          existingService.quantity += 1;
          alert(
            `Món ăn ${existingService.service_name} đã có trong menu, số lượng hiện tại là ${existingService.quantity}`
          );
          this.refreshList();
        } else {
          // Nếu món ăn chưa có trong menu thì thêm vào menu với số lượng đầu tiên là 1 món
          this.activeService.quantity = 1;
          // Thêm món ăn vào menu
          this.menu.push(this.activeService);
          // Xóa món ăn vừa thêm vào menu khỏi danh sách hiển thị
          this.services.splice(this.activeIndex, 1);
          // Đặt lại chỉ số phần tử đang được chọn trên danh sách
          this.activeIndex = -1;
        }
        // Lưu menu vào localStorage
        localStorage.setItem("menu", JSON.stringify(this.menu));
        location.reload();
      }
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
label {
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
}
</style>
