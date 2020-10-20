<template>
  <q-card class="my-card2">
    <div class="q-pa-none">
      <q-carousel
        v-model="slide"
        swipeable
        animated
        control-color="dark"
        navigation-position="top"
        navigation
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 q-pa-none q-ma-none"
      >
        <q-carousel-slide :name="index + 1" class="q-pa-none" v-for="(pic, index) in product.pictures" :key="pic.id">
          <q-img :src=pic.picture style="height: 300px">
            <div class="absolute-bottom" style="height: 65px">
              <dv class="text-h6">{{product.title}}</dv>
            </div>
          </q-img>
        </q-carousel-slide>
      </q-carousel>

    </div>

    <q-card-section>
      <q-badge class="text-body2 text-weight-bold q-ma-sm">
        Brand: {{product.brand}}
      </q-badge>
      <q-badge class="text-body2 text-weight-bold q-ma-sm">
        Price: ${{product.price}}
      </q-badge>
      <q-badge v-if="product.type === 'C'" class="text-body2 text-weight-bold q-ma-sm">
        Material: {{product.material}}
      </q-badge>
      <q-badge class="text-body2 text-weight-bold q-ma-sm">
        Available in stock: {{product.amount}}
      </q-badge>
      <q-badge class="text-body2 text-weight-bold q-ma-sm">
        Rating: {{product.rating}}
      </q-badge>
    </q-card-section>

    <q-card-actions class="flex flex-center">
      <div class="flex flex-center">
        <div class="q-pa-sm" style="width: 230px">
          <q-select
            rounded
            outlined
            v-model="size"
            :options="product.size_data"
            option-value="id"
            option-label="size"
            emit-value
            map-options
            label="Choose size"
            no-caps
          />
        </div>
        <div class="q-pa-sm" style="width: 230px">
          <q-select
            outlined
            rounded
            v-model="color"
            :options="product.color_data"
            option-value="id"
            option-label="name"
            emit-value
            map-options
            label="Choose color"
            no-caps
          />
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model.number="count"
            type="number"
            outlined
            rounded
            class="q-pa-md"
            style="width: 150px"
          />
        </div>
      </div>
      <div class="q-pa-sm flex flex-center">
        <div class="q-pa-xs">
          <q-btn no-caps rounded flat icon="add_shopping_cart" label="Add to cart" @click="addToCart"
                 class="text-white bg-dark q-pa-xs"/>
        </div>
        <div class="q-pa-xs">
          <q-btn no-caps rounded flat label="Close" @click="$emit('close')" style="width: 80px;" class="q-pa-xs"/>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "ProductDetail",
        props: ['product'],
        data() {
            return {
                color: null,
                size: null,
                slide: 1,
                count: 1
            }
        },
        methods: {
            ...mapActions('invoice', ['addItemToCart']),
            addToCart() {
                var data = {
                    color: this.color,
                    size: this.size,
                    count: this.count,
                    product: this.product.id
                };
                this.addItemToCart(data).then(() => {
                    this.$q.notify({
                        message: "Item was added to cart",
                        type: "positive",
                    })
                }).catch((e) => {
                    this.$q.notify({
                        message: e,
                        type: "negative",
                    })
                })
            }
        }
    }
</script>

<style scoped>
  .my-card2 {
    width: 100%;
    width: 500px;
  }
</style>
