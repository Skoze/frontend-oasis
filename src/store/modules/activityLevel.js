import { getSegmentation } from '@/api';

const color = ['#EF5350', '#FFA726', '#FFEE58', '#66BB6A'];
const segmentations = [0.01, 0.2, 0.5];

export default {
  state: {},
  getters: {
    activity2Color(state) {
      return (activity, type) => {
        const levelArray = state[type];
        if (!Array.isArray(levelArray) || !type) {
          return 'lightgray';
        } else {
          for (let index in levelArray) {
            if (activity >= levelArray[index]) {
              return color[index];
            }
          }
          return color[color.length - 1];
        }
      };
    },
  },
  mutations: {
    setLevelArray(state, { type, list }) {
      state[type] = list;
    },
  },
  actions: {
    async updateLevelArray({ commit }, type) {
      let list = null;
      if (sessionStorage.getItem(type)) {
        list = JSON.parse(sessionStorage.getItem(type));
      } else {
        const promises = [];
        for (let segmentation of segmentations) {
          promises.push(getSegmentation(type, segmentation));
        }
        try {
          list = await Promise.all(promises);
          sessionStorage.setItem(type, JSON.stringify(list));
        } catch {
          return Promise.reject();
        }
      }
      commit('setLevelArray', { type, list });
    },
    async updateAll({ dispatch }) {
      await Promise.all([
        dispatch('updateLevelArray', 'author'),
        dispatch('updateLevelArray', 'institution'),
        dispatch('updateLevelArray', 'keyword'),
      ]);
    },
  },
};
