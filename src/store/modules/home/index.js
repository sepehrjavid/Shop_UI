import axios from "axios";

const state = {
  sportTools: [],
  cloth: [],
  colors: []
};

const mutations = {
  setSportTools(state, payload) {
    state.sportTools = payload;
  },
  setCloth(state, payload) {
    state.cloth = payload;
  },
  setColors(state, payload) {
    state.colors = payload;
  }
};


const actions = {
  searchSportToolProducts(context, query) {
    if (Object.keys(query).length === 0) {
      return axios.get("http://127.0.0.1:8000/api/product/sport_tool_list_create").then((response) => {
        context.commit('setSportTools', response.data);
      });
    } else {
      return axios.get("http://127.0.0.1:8000/api/product/sport_tool_list_create", {
        params: query
      }).then((response) => {
        context.commit('setSportTools', response.data);
      })
    }
  },
  searchClothProducts(context, query) {
    if (Object.keys(query).length === 0) {
      return axios.get("http://127.0.0.1:8000/api/product/cloth_list_create").then((response) => {
        context.commit('setCloth', response.data);
      });
    } else {
      return axios.get("http://127.0.0.1:8000/api/product/cloth_list_create", {
        params: query
      }).then((response) => {
        context.commit('setCloth', response.data);
      })
    }
  },
  fetchColors(context) {
    return axios.get("http://127.0.0.1:8000/api/product/color_list").then((response) => {
      var lst = [];
      response.data.forEach((value) => {
        lst.push(value.name)
      });
      context.commit('setColors', lst);
    })
  }
};


const getters = {
  getSportTools: (state) => {
    return state.sportTools
  },
  getCloth: (state) => {
    return state.cloth
  },
  getColors: (state) => {
    return state.colors
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
