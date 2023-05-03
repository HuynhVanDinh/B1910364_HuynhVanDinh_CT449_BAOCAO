<script>
import AcceptOrder from "@/services/acceptOrder.service";
export default {
  props: {
    patients: { type: Array, default: [] },
  },

  methods: {
    calculateTotal(bills) {
      let total = 0;
      for (const bill of bills) {
        total += parseFloat(bill.price * bill.quantity);
      }
      return total;
    },

    togglebill(index) {
      this.patients[index].showMenu = !this.patients[index].showMenu;
    },
    async accept(userId, orderId) {
      console.log(userId, orderId);
      try {
        const rs = await AcceptOrder.accept(userId, orderId);
        console.log("hike", rs);
        if (rs) {
          // Cập nhật lại trang
          // location.reload()
          console.log(this.patients);
          this.$emit("accept", this.patients);
        }
      } catch (error) {
        console.log(error);
      }
    },
    showConfirm(userId, orderId) {
      if (confirm("Bạn có chắc chắn muốn xác nhận thanh toán hoá đơn này?")) {
        this.accept(userId, orderId);
      }
    },
    formatCurrency(number) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return formatter.format(number);
    },
  },
};
</script>

<template>
  <div class="row">
    <div
      class="col-md-6 mb-2"
      v-for="(order, index) in patients"
      :key="order._id"
    >
      <!-- Hiển thị thông tin đơn hàng -->
      <ul class="list-group">
        <li class="list-group-item">
          <div v-if="order.order.status == 0" class="float-right">
            <button
              class="btn btn-danger"
              @click="showConfirm(order.userId, order.order._id)"
            >
              Xác nhận thanh toán
            </button>
          </div>
          <div
            v-if="order.order.status == 1"
            class="float-right border border-success rounded p-2"
          >
            <span class="text-success">Đã thanh toán</span>
          </div>
          <b>Tên bệnh nhân: </b>{{ order.fullname }}<br />
          <b>Số điện thoại: </b>{{ order.phone }}<br />
          <b>Email: </b>{{ order.email }}<br />
          <b>Ngày khám: </b>{{ order.order.patients_date }}<br />
          <b>Tổng tiền: </b
          >{{ formatCurrency(calculateTotal(order.order.bills)) }}
          <div>
            <button class="btn btn-light" @click="toggleMenu(index)">
              {{
                order.showMenu
                  ? "Ẩn chi tiết hoá đơn"
                  : "Hiển thị chi tiết hoá đơn"
              }}
            </button>
            <div>
              <ul v-if="order.showMenu">
                <li v-for="bill in order.order.bills">
                  {{ bill.service_name }} - giá: {{ bill.price }} - số lượng:
                  {{ bill.quantity }}
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
