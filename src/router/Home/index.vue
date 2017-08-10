<template>
  <main>
    <mt-button type="primary" @click="hello">primary</mt-button>
    <hello></hello>
  </main>
</template>

<script>
  import Hello from '~components/Hello'
  import { Button, Toast } from 'mint-ui'
  export default {
    components: {
      Hello,
      Toast,
      MtButton:Button
    },
    methods: {
      hello () {
        Toast({
          message: 'Hello Vue',
          iconClass: 'icon icon-success'
        })
      }
    }
  }
</script>
<style lang="scss">
  body{
      /*background-color: red;*/
  }
</style>

