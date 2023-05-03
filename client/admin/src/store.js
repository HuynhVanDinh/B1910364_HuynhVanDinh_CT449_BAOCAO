import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";

const store = createStore({
  state() {
    return {
      Auth: false,
    };
  },
  mutations: {
    setAuth(state, Auth) {
      state.Auth = Auth;
    },
  },
  actions: {},
  plugins: [createPersistedState({})],
});

export default store;
