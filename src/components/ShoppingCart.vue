<template>
  <q-card style="width: 900px; max-height: 500px; min-height: 100px" class="row">
    <div v-if="!loading && getCart.length !== 0">
      <q-list bordered class="rounded-borders q-pa-md" style="width: 900px">
        <div v-for="(order, index) in getCart" :key="order.id">
          <q-item class="q-pa-sm">
            <q-item-section style="max-width: 120px">
              <q-img :src=order.product.picture></q-img>
            </q-item-section>

            <q-item-section class="q-pl-lg">
              <q-item-label>{{order.product.title}}</q-item-label>
            </q-item-section>

            <q-item-section class="q-pa-sm">
              <div class="row justify-between">
                <span>{{order.count}}</span>
                <span>{{order.size}}</span>
                <span>{{order.color}}</span>
                <span>{{order.price}}</span>
              </div>
            </q-item-section>

            <q-item-section side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn flat rounded icon="delete" class="text-secondary" @click="removeItemFromCart(order.id)"/>
              </div>
            </q-item-section>
          </q-item>
          <q-separator spaced v-if="index !== getCart.length - 1"/>
        </div>
      </q-list>
      <div class="q-pa-md row justify-between">
        <q-btn flat no-caps rounded label="Submit Cart" @click="submitCart" style="height: 40px"
               class="bg-primary text-white"/>
        <div class="q-pa-md text-weight-bold">
          Total Price: {{this.getTotalPrice}}
        </div>
      </div>
    </div>
    <div v-else-if="!loading && getCart.length === 0"
         class="col justify-center text-h6 text-weight-bold flex flex-center">
      Your Shopping Cart Is Empty
      <q-icon name="shopping_cart" class="q-pa-sm" size="30px"/>
    </div>
    <loading-circle v-else/>
  </q-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import LoadingCircle from "./LoadingCircle";

    export default {
        name: "ShoppingCart",
        components: {LoadingCircle},
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapGetters('invoice', ['getCart']),
            getTotalPrice() {
                var totalPrice = 0;
                this.getCart.forEach((value) => {
                    totalPrice += value.price;
                });
                return totalPrice;
            }
        },
        methods: {
            ...mapActions('invoice', ['fetchUserCart', 'removeItemFromCart', 'submitCart']),
        }, created() {
            this.loading = true;
            this.fetchUserCart().then(() => {
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>
