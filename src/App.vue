<template>
  
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>
<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
export default {
  components :{
    Header,
    Footer
  }
}
</script>
<style lang="scss">
  
  
</style>
