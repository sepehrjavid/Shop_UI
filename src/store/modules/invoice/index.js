import axios from "axios";
import moment from 'moment';

const state = {
  cart: [],
  orders: []
};

const mutations = {
  setCart(state, payload) {
    state.cart = payload;
  },
  removeFromCart(state, id) {
    state.cart = state.cart.filter((value) => {
      return value.id !== id;
    })
  },
  clearCartAddOrder(state, order) {
    state.orders = [order].concat(state.orders);
    state.cart = [];
  },
  setOrders(state, payload) {
    state.orders = payload
  },
};


const actions = {
  fetchUserCart(context) {
    return axios.get("http://127.0.0.1:8000/api/invoice/get_cart").then((response) => {
      response.data.forEach((val) => {
        val.product.picture = "http://127.0.0.1:8000" + val.product.picture;
      });
      context.commit('setCart', response.data)
    })
  },
  fetchOrders(context) {
    return axios.get("http://127.0.0.1:8000/api/invoice/get_orders").then((response) => {
      response.data.forEach((val) => {
        val.date = moment(val.date).format('MMMM D YYYY, HH:mm');
        val.items.forEach((value) => {
          value.product.picture = "http://127.0.0.1:8000" + value.product.picture;
        })
      });
      context.commit('setOrders', response.data)
    })
  },
  addItemToCart(context, payload) {
    return axios.post("http://127.0.0.1:8000/api/invoice/add_to_cart", payload).then((response) => {
      var found = false;
      var cloths = context.rootGetters["home/getCloth"];
      cloths.forEach((value) => {
        if (value.id === payload.product) {
          found = true;
          value.amount -= payload.count;
        }
      });
      context.commit('home/setCloth', cloths, {root: true});
      if (!found) {
        var sportTools = context.rootGetters["home/getSportTools"];
        sportTools.forEach((value) => {
          if (value.id === payload.product) {
            value.amount -= payload.count;
          }
        });
        context.commit('home/setSportTools', sportTools, {root: true});

      }
    }).catch((err) => {
      throw err.response.data.non_field_errors[0]
    })
  },
  removeItemFromCart(context, id) {
    return axios.delete("http://127.0.0.1:8000/api/invoice/remove_item/" + id.toString()).then((response) => {
      context.commit('removeFromCart', id);
    })
  },
  submitCart(context) {
    return axios.get("http://127.0.0.1:8000/api/invoice/submit_order").then((response) => {
      response.data.date = moment(response.data.date).format('MMMM D YYYY, HH:mm');
      context.commit('clearCartAddOrder', response.data);
    })
  }
};


const getters = {
  getCart: (state) => {
    return state.cart
  },
  getOrders: (state) => {
    return state.orders
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
