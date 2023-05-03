<template>
  <div class="container content">
    <div>
      <h4>Lịch sử</h4>
      <HistoryServiceList
        v-if="filleredordercount > 0"
        :orders="filteredorder"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Bạn chưa có hoá đơn nào.</p>
    </div>
  </div>
</template>
<script>
import HistoryServiceList from "@/components/HistoryServiceList.vue";
import billService from "../services/bill.service";

export default {
  components: {
    HistoryServiceList,
  },
  data() {
    return {
      orders: [],
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
        this.orders = await billService.historyBill();
        console.log(this.orders);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveOrders();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.content {
  position: relative;
  z-index: 1;
}
</style>
