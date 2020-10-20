<template>
  <q-card class="q-pa-md">
    <q-card-section v-if="loginMode" class="text-center text-h4 text-weight-bold" style="width: 400px">
      Login
    </q-card-section>
    <q-card-section v-else class="text-center text-h4 text-weight-bold" style="width: 400px">
      Signup
    </q-card-section>
    <q-card-section v-if="showError" class="text-body1 text-negative">
      {{errorMessage}}
    </q-card-section>
    <q-form v-if="loginMode">
      <q-input v-model="username" outlined rounded label="Username" class="q-pa-sm"/>
      <q-input v-model="password" outlined rounded label="Password" class="q-pa-sm" type="password"/>
    </q-form>
    <q-form v-else>
      <q-input v-model="username" outlined rounded label="Username" class="q-pa-sm"/>
      <q-input v-model="email" outlined rounded label="Email" class="q-pa-sm"/>
      <q-input v-model="password" outlined rounded label="Password" class="q-pa-sm" type="password"/>
      <q-input v-model="repassword" outlined rounded label="Re-enter password" class="q-pa-sm" type="password"/>
    </q-form>
    <q-card-actions v-if="loginMode">
      <q-btn label="Login" rounded flat no-caps class="q-pa-xs bg-dark text-white" style="width: 100px"
             @click="sendLoginOrSignup"/>
      <q-btn rounded flat class="q-pa-xs" no-caps label="Create account" @click="loginMode = ! loginMode"/>
    </q-card-actions>
    <q-card-actions v-else>
      <q-btn label="Sign up" rounded no-caps flat class="q-pa-xs bg-dark text-white" style="width: 100px"
             @click="sendLoginOrSignup"/>
      <q-btn rounded flat class="q-pa-xs" no-caps label="Already have an account" @click="loginMode = ! loginMode"/>
    </q-card-actions>
  </q-card>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "login",
        data() {
            return {
                loginMode: true,
                username: '',
                password: '',
                repassword: '',
                email: '',
                showError: false,
                errorMessage: ''
            }
        },
        methods: {
            ...mapActions('authentication', ['login', 'signup', 'fetchUserInfo']),
            sendLoginOrSignup() {
                if (this.loginMode) {
                    this.login({
                        username: this.username,
                        password: this.password
                    }).then(() => {
                        this.fetchUserInfo()
                        this.$emit('close')
                    }).catch(() => {
                        this.errorMessage = "*Incorrect username or password";
                        this.showError = true;
                    });
                } else {
                    if (this.password !== this.repassword) {
                        this.errorMessage = "*Passwords do not match";
                        this.showError = true;
                        return
                    }
                    this.signup({
                        username: this.username,
                        password: this.password,
                        email: this.email
                    }).then(() => {
                        this.fetchUserInfo()
                        this.$emit('close')
                    }).catch((e) => {
                        this.errorMessage = e;
                        this.showError = true;
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
