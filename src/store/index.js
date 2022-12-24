import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    workday: null,
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    workday: (state) => {
      return state.workday;
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    workday(state, workday) {
      state.workday = workday;
    }
  },
  actions: {
    user(context, user) {
      context.commit('user', user);
    },
    workday(context, workday) {
      context.commit('workday', workday);
    }
  },
  modules: {
  }
})
