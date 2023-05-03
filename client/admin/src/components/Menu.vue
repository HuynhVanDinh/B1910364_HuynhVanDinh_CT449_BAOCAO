<template>
  <h1 class="text-center">Hoá Đơn</h1>
  <div>
    <b-alert show :variant="success">{{ message }}</b-alert>
  </div>
  <div class="text-center" v-if="menuData.length === 0">Hoá đơn trống</div>
  <table v-else class="table tbale-bordered text-center">
    <thead>
      <th width="20%">Hình ảnh</th>
      <th width="20%">Tên dịch vụ</th>
      <th>Thuốc</th>
      <th>Giá</th>
      <th colspan="2" width="30%">Số lượng</th>
      <th width="15%">Thao tác</th>
    </thead>
    <tbody>
      <tr v-for="(service, index) in menuData" :key="index">
        <td><img :src="getImage(service)" alt="" class="w-100 h-100" /></td>
        <td>{{ service.service_name }}</td>
        <td>{{ service.service_categories }}</td>
        <td>{{ formatCurrency(service.price) }}</td>

        <td>
          <input
            type="number"
            v-model="service.quantity"
            min="1"
            style="width: 50px"
          />
        </td>
        <td><button @click="updateQuantity(index)">Cập nhật</button></td>
        <td>
          <button @click="confirmDelete(index)">Xoá</button>
        </td>
      </tr>
    </tbody>
  </table>
  <Form @submit="submitOrder" :validation-schema="orderFormSchema">
    <span class="float-right mb-3"
      >Tổng chi phí:
      <b class="text-danger">{{
        Total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      }}</b></span
    >
    <hr />
    <br />
    <div class="form-group float-right">
      <button class="btn btn-primary" @click="addOrder">Xuất hoá đơn</button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import orderService from "../services/order.service";
import OrderGetItemService from "../services/orderGetItem.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    id: { type: Object, required: true },
  },
  data() {
    const orderFormSchema = yup.object().shape({
      address_book: yup
        .string()
        .max(1000, "Địa chỉ tối đa 1000 ký tự.")
        .required("Vui lòng nhập lời dặn!!!"),
    });
    return {
      message: "",
      menuData: [],
      totalData: "",

      orderLocal: {
        menus: this.menuData,
        address_book: "",
        total: this.totalData,
      },
      orderFormSchema,
    };
  },

  mounted() {
    this.$forceUpdate();
  },
  computed: {
    Total() {
      let total = 0;
      if (this.menuData) {
        this.menuData.forEach((item) => {
          total += +item.price * item.quantity;
        });
      }
      return total;
    },
  },
  watch: {
    menuData() {
      console.log("thay doi");
      console.log(this.orderLocal.menus);
      console.log(localStorage.getItem("menu"));
      this.$forceUpdate;
    },
  },
  created() {
    const menuData = localStorage.getItem("menu");
    if (menuData) {
      this.menuData = JSON.parse(menuData);
      this.orderLocal.menus = JSON.stringify(this.menuData);
      this.orderLocal.total = this.Total;
    }
  },

  methods: {
    formatCurrency(number) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return formatter.format(number);
    },
    confirmDelete(index) {
      if (
        window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này khỏi hoá đơn?")
      ) {
        this.menuData.splice(index, 1);
        this.orderLocal.menus = JSON.stringify(this.menuData);
        console.log(this.orderLocal.menus);
        localStorage.setItem("menu", JSON.stringify(this.menuData));
        this.$emit("update:menu", this.menuData);
        // console.log("hihihihih",this.Total);
        this.orderLocal.total = this.Total;
        // this.totalPrice = this.Total();
      }
    },

    updateQuantity(index) {
      if (window.confirm("Bạn có chắc chắn muốn thay đổi số lượng?")) {
        const newQuantity = this.menuData[index].quantity;
        // Cập nhật số lượng mới của món ăn trong menuData
        for (let i = 0; i < this.menuData.length; i++) {
          if (i === index) {
            this.menuData[i].quantity = newQuantity;
          }
        }
        this.message = "Cập nhật thành công.";
      }
      // Lưu menuData mới vào localStorage
      localStorage.setItem("menu", JSON.stringify(this.menuData));
      //cập nhật lại orderLocal.menus
      this.orderLocal.menus = localStorage.getItem("menu");
      //cập nhật lại total
      this.orderLocal.total = this.Total;
    },
    async addOrder(data) {
      console.log("id ne", this.menuData);
      try {
        const menu = localStorage.getItem("menu");
        if (!menu) {
          alert(
            "Bạn chưa có dịch vụ. Vui lòng chọn dịch vụ trước khi xuất hoá đơn."
          );
          return;
        }
        const confirmed = confirm("Bạn chắc chắn muốn xuất hoá đơn?");
        if (!confirmed) {
          return;
        }
        console.log("hi");
        const id = this.id;
        await OrderGetItemService.addOrder(id, this.menuData);
        console.log("hi");
        this.message = "Thêm đơn thành công.";
        localStorage.setItem("menu", "");
        // localStorage.removeItem("menu");
        this.$router.push("/order");
      } catch (error) {
        console.log(error);
      }
    },

    getImage(service) {
      return `http://localhost:3000/${service.image}`;
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
