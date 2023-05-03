<script>
export default {
  props: {
    orders: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  methods: {
    calculateTotal(menus) {
      let total = 0;
      for (const menu of menus) {
        total += parseFloat(menu.price * menu.quantity);
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
      <tr v-for="(order, index) in orders" :key="order._id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ order.order_date }}</td>
        <td>
          <ul>
            <li style="list-style: none" v-for="menu in order.menus">
              {{ menu.food_name }}
            </li>
          </ul>
        </td>
        <td>
          <ul>
            <li style="list-style: none" v-for="menu in order.menus">
              {{ menu.price }}
            </li>
          </ul>
        </td>
        <td>
          <ul>
            <li style="list-style: none" v-for="menu in order.menus">
              {{ menu.quantity }}
            </li>
          </ul>
        </td>
        <td>{{ calculateTotal(order.menus) }}</td>
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
