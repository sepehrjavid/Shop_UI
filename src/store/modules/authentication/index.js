import axios from "axios";

const state = {
  token: localStorage.getItem("SalesToken") || '',
  userData: {}
};

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUserData(state, payload) {
    state.userData = payload;
  }
};


const actions = {
  login(context, payload) {
    return axios.post("http://127.0.0.1:8000/api/login", payload).then((response) => {
      let token = response.data.token;
      context.commit('setToken', token);
      localStorage.setItem("SalesToken", 'JWT ' + token);
      axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    }).catch((err) => {
      throw err.response.data
    })
  },
  signup(context, payload) {
    return axios.post("http://127.0.0.1:8000/api/accounting/create_account", payload).then((response) => {
      let token = response.data.token;
      context.commit('setToken', token);
      localStorage.setItem("SalesToken", 'JWT ' + token);
      axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    }).catch((err) => {
      if (err.response.data.username !== undefined) {
        throw err.response.data.username[0]
      } else {
        throw err.response.data.email[0]
      }
    })
  }, fetchUserInfo(context) {
    return axios.get("http://127.0.0.1:8000/api/accounting/get_user_info").then((response) => {
      context.commit('setUserData', response.data)
    })
  },
  logout(context) {
    context.commit('setToken', null);
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem("SalesToken");
    this.$router.push({name: "home"});
    context.commit('setUserData', {});
  },
};


const getters = {
  getUserData: (state) => {
    return state.userData
  },
  isAuthenticated: (state) => {
    return !!state.token
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
