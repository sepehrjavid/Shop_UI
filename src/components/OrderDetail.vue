<template>
  <q-card style="width: 900px; max-height: 500px; min-height: 100px" class="row">
    <q-list bordered class="rounded-borders q-pa-md" style="width: 900px">
      <div v-for="(item, index) in order.items" :key="item.id">
        <q-item class="q-pa-sm">
          <q-item-section style="max-width: 120px">
            <q-img :src=item.product.picture></q-img>
          </q-item-section>

          <q-item-section class="q-pl-lg">
            <q-item-label>{{item.product.title}}</q-item-label>
          </q-item-section>

          <q-item-section class="q-pa-sm">
            <div class="row justify-between">
              <span>{{item.count}}</span>
              <span>{{item.size}}</span>
              <span>{{item.color}}</span>
              <span>{{item.price}}</span>
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced v-if="index !== order.items.length - 1"/>
      </div>
    </q-list>
    <div class="q-pa-md col justify-between">
      <div class="text-weight-bold row justify-end">
        Total Price: {{this.getTotalPrice}}
      </div>
      <div class="q-pt-md row justify-center">
        <q-btn flat no-caps rounded label="Close" @click="closeDialog" class="text-white bg-dark"
               style="width: 80px"/>
      </div>
    </div>
  </q-card>
</template>

<script>
    export default {
        name: "OrderDetail",
        props: ['order'],
        computed: {
            getTotalPrice() {
                var totalPrice = 0;
                this.order.items.forEach((value) => {
                    totalPrice += value.price;
                });
                return totalPrice;
            }
        }, methods: {
            closeDialog() {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>
