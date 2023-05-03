<script>
export default {
  props: {
    users: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>
<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(user, index) in users"
      :key="user._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ user.fullname }}
    </li>
  </ul>
</template>
