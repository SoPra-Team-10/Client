import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backgroundMusic: undefined
  },
  modules: {},
  mutations: {
    loadBackgroundMusic(state, track) {
      state.backgroundMusic = track;
    },
    playBackgroundMusic(state) {
      if (state.backgroundMusic) {
        state.backgroundMusic.play();
      }
    },
    pauseBackgroundMusic(state) {
      if (state.backgroundMusic) {
        state.backgroundMusic.pause();
      }
    }
  }
});
