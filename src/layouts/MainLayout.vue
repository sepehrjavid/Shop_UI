<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="cursor-pointer q-pa-sm q-ml-sm" @click="$router.replace({name:'home'})">
          Melika Store
        </q-toolbar-title>

        <div class="q-pa-xs">
          <q-btn icon="home" flat @click="$router.replace({name:'home'})"/>
          <q-tooltip>Home</q-tooltip>
        </div>
        <div class="q-pa-xs" v-if="isAuthenticated">
          <q-btn icon="shopping_cart" flat @click="$router.replace({name:'invoice'})"/>
          <q-tooltip>Invoice</q-tooltip>
        </div>
        <div class="q-pa-xs" v-if="isAuthenticated">
          <q-btn icon="logout" flat @click="logout"/>
          <q-tooltip>Logout</q-tooltip>
        </div>
        <div class="q-pa-xs" v-else>
          <q-btn icon="login" flat @click="loginDialog = true"/>
          <q-tooltip>Login</q-tooltip>
        </div>
        <div class="q-pa-xs text-h6 q-mr-sm" v-if="isAuthenticated">
          {{getUserData.username}}
        </div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-dialog v-model="loginDialog">
      <login @close="loginDialog = false"/>
    </q-dialog>
  </q-layout>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import login from "../components/login";

    export default {
        name: 'MainLayout',
        components: {login},
        data() {
            return {
                loginDialog: false
            }
        }, computed: {
            ...mapGetters('authentication', ['getUserData', 'isAuthenticated']),
        }, methods: {
            ...mapActions('authentication', ['fetchUserInfo', 'logout']),
        },
        async created() {
            if (this.isAuthenticated) {
                this.fetchUserInfo()
            }
        }
    }
</script>
