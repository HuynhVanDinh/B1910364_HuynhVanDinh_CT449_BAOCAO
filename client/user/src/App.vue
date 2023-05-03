<script>
import AppHeader from "@/components/AppHeader.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    AppHeader,
    Footer,
  },
};
</script>
<template>
  <div id="app" class="bg-nk vh-100">
    <div class="container">
      <AppHeader />
      <div class="container p-5 bg-white">
        <router-view />
      </div>
      <Footer />
    </div>
  </div>
</template>
<style scoped>
@import "@/assets/form-login.css";
</style>
