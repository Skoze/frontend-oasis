import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import activityLevel from './modules/activityLevel';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { user, activityLevel },
});
