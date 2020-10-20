<template>
  <div style="min-height: 500px">
    <div class="flex flex-center q-pa-lg">
      <shopping-cart/>
    </div>
    <div v-if="!loading && getOrders.length !== 0" class="flex-center flex q-pa-lg">
      <q-list bordered class="rounded-borders" style="width: 700px">
        <div v-for="(order, index) in getOrders" :key="order.id" @click="showDetail(order)" class="cursor-pointer">
          <q-item>
            <q-item-section>
              <q-item-label>{{order.date}}</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label class="row justify-between q-pa-md">
                <q-badge v-if="order.state === 'Delivered'" class="text-body2 text-weight-bold bg-positive">
                  {{order.state}}
                </q-badge>
                <q-badge v-else class="text-body2 text-weight-bold bg-info">
                  {{order.state}}
                </q-badge>
                <span v-if="order.items.length > 1">{{order.items.length}} items</span>
                <span v-else>{{order.items.length}} item</span>
              </q-item-label>
            </q-item-section>

          </q-item>

          <q-separator spaced v-if="index !== getOrders.length - 1"/>
        </div>

      </q-list>
    </div>
    <div v-else-if="!loading && getOrders.length === 0"
         class="col justify-center text-h6 text-weight-bold flex flex-center" style="min-height: 200px">
      You Haven't Ordered Anything! Let's Give It A Try
      <q-btn flat rounded no-caps label="Go Shopping" icon="shopping_cart" class="q-pa-xs q-ma-md text-white bg-dark"
             @click="$router.replace({name: 'home'})"/>
    </div>
    <loading-circle v-else/>
    <q-dialog v-model="showDialog">
      <order-detail @close="showDialog = false" :order="selectedOrder"/>
    </q-dialog>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import ShoppingCart from "../components/ShoppingCart";
    import LoadingCircle from "../components/LoadingCircle";
    import ProductDetail from "../components/ProductDetail";
    import OrderDetail from "../components/OrderDetail";


    export default {
        name: "Invoice",
        components: {OrderDetail, ProductDetail, ShoppingCart, LoadingCircle},
        data() {
            return {
                loading: false,
                showDialog: false,
                selectedOrder: null
            }
        },
        computed: {
            ...mapGetters('invoice', ['getOrders']),
        },
        methods: {
            ...mapActions('invoice', ['fetchOrders']),
            showDetail(order){
                this.selectedOrder = order;
                this.showDialog = true
            }
        }, created() {
            this.loading = true;
            this.fetchOrders().then(() => {
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>
