<template>
  <div class="container">
    <div>
      <h4>Lịch sử khám</h4>
      <OrderList
        v-if="filleredordercount > 0"
        :orders="filteredorder"
        @accept="acceptEvent"
        @cancel="cancelEvent"
      />
      <p v-else>Chưa có lịch sử khám.</p>
    </div>
  </div>
</template>
<script>
import OrderList from "@/components/OrderList.vue";
import orderService from "../services/order.service";

export default {
  components: {
    OrderList,
  },
  data() {
    return {
      orders: [],
    };
  },

  computed: {
    filteredorder() {
      return this.orders;
    },

    filleredordercount() {
      return this.filteredorder.length;
    },
  },
  methods: {
    async retrieveOrders() {
      try {
        this.orders = await orderService.findAll();
        console.log(this.orders);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveOrders();
    },
    acceptEvent() {
      this.refreshList();
    },
    cancelEvent() {
      this.refreshList();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
