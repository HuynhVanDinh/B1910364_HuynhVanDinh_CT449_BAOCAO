<script>
export default {
  props: {
    patients: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  methods: {
    calculateTotal(bills) {
      let total = 0;
      for (const bill of bills) {
        total += parseFloat(bill.price * bill.quantity);
      }
      return total;
    },
  },
};
</script>
<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Ngày khám</th>
        <th scope="col">Dịch vụ</th>
        <th scope="col">Giá</th>
        <th scope="col">Số lượng</th>
        <th scope="col">Tổng tiền</th>
        <th scope="col">Thanh toán</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, index) in patients" :key="order._id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ order.patients_date }}</td>
        <td>
          <ul>
            <li style="list-style: none" v-for="bill in order.bills">
              {{ bill.service_name }}
            </li>
          </ul>
        </td>
        <td>
          <ul>
            <li style="list-style: none" v-for="bill in order.bills">
              {{ bill.price }}
            </li>
          </ul>
        </td>
        <td>
          <ul>
            <li style="list-style: none" v-for="bill in order.bills">
              {{ bill.quantity }}
            </li>
          </ul>
        </td>
        <td>{{ calculateTotal(order.bills) }}</td>
        <td>
          <span class="text-warning" v-if="order.status == 0"
            >Chưa thanh toán</span
          >
          <span class="text-success" v-if="order.status == 1"
            >Đã thanh toán</span
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
