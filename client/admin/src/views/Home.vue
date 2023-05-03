<template>
  <div class="page row">
    <div class="col-md-7">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-7">
      <h4>
        Danh sách các bệnh nhân
        <i class="fas fa-address-book"></i>
      </h4>
      <UserList
        v-if="filteredUserCount > 0"
        :users="filteredUser"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có bệnh nhân nào</p>
      <div class="mt-3 justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary mr-3" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddUser">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-5">
      <div v-if="activeUser">
        <h4>
          Chi tiết bệnh nhân
          <i class="fas fa-address-card"></i>
        </h4>
        <UserCard :user="activeUser" />

        <router-link
          :to="{
            name: 'service.add',
            params: { id: activeUser._id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Điều trị</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import UserCard from "@/components/UserCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
import UserService from "@/services/user.service";
export default {
  components: {
    UserCard,
    InputSearch,
    UserList,
  },
  data() {
    return {
      users: [],
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
    userString() {
      return this.users.map((user) => {
        const { fullname, username, phone } = user;
        return [fullname, username, phone].join("");
      });
    },
    filteredUser() {
      if (!this.searchText) return this.users;
      return this.users.filter((_user, index) =>
        this.userString[index].includes(this.searchText)
      );
    },
    activeUser() {
      if (this.activeIndex < 0) return null;
      return this.filteredUser[this.activeIndex];
    },
    filteredUserCount() {
      return this.filteredUser.length;
    },
    menuCount() {
      return this.menu.length;
    },
  },
  methods: {
    async retrieveUsers() {
      try {
        this.users = await UserService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveUsers();
      this.activeIndex = -1;
    },
    goToAddUser() {
      this.$router.push({ name: "user.add" });
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
