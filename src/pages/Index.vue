<template>
  <q-page>
    <div class="q-pa-lg" style="max-width: 600px; margin: auto;">
      <q-form @submit="searchForProduct">
        <q-input dense outlined rounded v-model="query.title" class="q-pa-md text-weight-bold"
                 placeholder="Find your deepest desire">
          <template v-slot:append>
            <q-icon v-if="query.title !== ''" name="clear" class="cursor-pointer" @click="query.title=''"/>
            <q-icon name="settings" class="cursor-pointer" @click="complexSearch = ! complexSearch">
              <q-tooltip content-class="bg-indigo" :offset="[10, 10]">
                Advanced Search
              </q-tooltip>
            </q-icon>
            <q-icon name="search" class="cursor-pointer" @click="searchForProduct">
              <q-tooltip content-class="bg-indigo" :offset="[10, 10]">
                Search
              </q-tooltip>
            </q-icon>
          </template>
        </q-input>
        <div v-if="complexSearch" class="q-pa-md">
          <q-btn-toggle
            name="Product type"
            v-model="productType"
            push
            no-caps
            toggle-color="primary"
            :options="[
          {label: 'Sport', value: 'Sport'},
          {label: 'Cloth', value: 'Cloth'}
        ]"
          />
          <q-input dense outlined rounded v-model="brand" class="q-pa-md text-weight-bold"
                   placeholder="Enter your favorite brand"/>
          <q-select
            v-model="colors"
            multiple
            :options="getColors"
            use-chips
            outlined
            rounded
            stack-label
            label="Enter your favorite color"
            class="q-pa-md"
          />
          <div class="q-pa-md">
            <div>
              Your suitable price:
            </div>
            <q-range
              v-model="priceRange"
              :min="10"
              :max="1500"
              :step="100"
              :left-label-value="'$ ' + priceRange.min"
              :right-label-value="'$ ' + priceRange.max"
              label
              color="primary"
            />
          </div>

          <div class="row justify-end q-pa-md">
            <q-btn rounded flat no-caps class="bg-primary text-white" @click="searchForProduct">Let's
              Search
            </q-btn>
          </div>
        </div>
      </q-form>
    </div>
    <div class="flex flex-center q-pa-lg" v-if="!loading && getProducts.length !== 0">
      <div v-for="product in getProducts" class="q-pa-md" :key="product.id">
        <q-card class="my-card">
          <q-img :src=product.pictures[0].picture>
            <div class="absolute-bottom">
              <div class="text-h6">{{product.title}}</div>
            </div>
          </q-img>

          <q-card-section>
            <q-badge class="text-body2 text-weight-bold q-mr-sm q-mt-sm">
              Brand: {{product.brand}}
            </q-badge>
            <q-badge class="text-body2 text-weight-bold q-mr-sm q-mt-sm">
              Price: ${{product.price}}
            </q-badge>
            <q-badge class="text-body2 text-weight-bold q-mr-sm q-mt-sm">
              Rating: {{product.rating}}
            </q-badge>
          </q-card-section>

          <q-card-actions>
            <q-btn flat no-caps icon="read_more" rounded label="Detail" @click="showDetail(product)"/>
          </q-card-actions>
        </q-card>
      </div>
      <q-dialog v-model="showDialog">
        <product-detail @close="showDialog = false" :product="activeProduct"/>
      </q-dialog>
    </div>
    <div v-else-if="!loading && getProducts.length === 0" class="row justify-center items-center full-width"
         style="height: 60vh">
      Sorry! We don't have the product you're looking for!
    </div>
    <div v-else>
      <loading-circle/>
    </div>
  </q-page>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import LoadingCircle from "../components/LoadingCircle";
    import ProductDetail from "../components/ProductDetail";

    export default {
        name: 'PageIndex',
        components: {ProductDetail, LoadingCircle},
        data() {
            return {
                activeProduct: null,
                productType: 'Cloth',
                query: {
                    title: '',
                    price: '',
                    colors: '',
                    brand: ''
                },
                priceRange: {
                    min: 200,
                    max: 1000
                },
                colors: [],
                brand: '',
                loading: false,
                complexSearch: false,
                clothMode: true,
                showDialog: false,
            }
        },
        computed: {
            ...mapGetters('home', ['getCloth', 'getSportTools', 'getColors']),
            getProducts() {
                return this.clothMode ? this.getCloth : this.getSportTools;
            }
        },
        methods: {
            ...mapActions('home', ['searchSportToolProducts', 'searchClothProducts', 'fetchColors']),
            searchForProduct() {
                if (this.complexSearch) {
                    if (this.query.title === '') {
                        delete this.query.title
                    }
                    if (this.colors.length === 0) {
                        delete this.query.colors
                    } else {
                        this.query.colors = this.colors.join(' ');
                    }
                    if (this.brand === '') {
                        delete this.query.brand
                    } else {
                        this.query.brand = this.brand;
                    }
                    this.query.price = this.priceRange.min + " " + this.priceRange.max;
                    this.clothMode = this.productType === "Cloth";
                } else {
                    if (this.query.title === '') {
                        delete this.query.title
                    }
                    delete this.query.colors;
                    delete this.query.price;
                    delete this.query.brand;
                }

                this.loading = true;

                if (this.clothMode) {
                    this.searchClothProducts(this.query).then(() => {
                        this.loading = false;
                        this.activeProduct = this.getCloth[0];
                        this.query = {
                            title: '',
                            price: '',
                            colors: '',
                            brand: ''
                        };
                    });
                } else {
                    this.searchSportToolProducts(this.query).then(() => {
                        this.loading = false;
                        this.activeProduct = this.getSportTools[0];
                        this.query = {
                            title: '',
                            price: '',
                            colors: '',
                            brand: ''
                        };
                    })
                }
            },
            showDetail(product) {
                this.activeProduct = product;
                this.showDialog = true;
            }
        },
        mounted() {
            this.searchForProduct();
            this.fetchColors()
        }
    }
</script>

<style lang="css" scoped>
  .my-card {
    width: 100%;
    width: 300px;
  }
</style>

