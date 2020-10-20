<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>

    import login from 'components/login'

    export default {
        name: 'App',
        components: {login}
    }
</script>
