// auth.module.js
import { googleSdkLoaded } from 'vue3-google-login';
const state = {
    isAuthenticated: false,
    accessToken: null,
  };
  
  const mutations = {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
    },
  };
  
  const actions = {
    login({ commit }, { isAuthenticated, accessToken }) {
      commit('SET_AUTHENTICATED', isAuthenticated);
      commit('SET_ACCESS_TOKEN', accessToken);
    },
  };
  
  const getters = {
    isAuthenticated: (state) => state.isAuthenticated,
    accessToken: (state) => state.accessToken,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  