<template>
  <header>
    <Logo></Logo>
    <div class="nav nav-pills">
      <div class="nav-item" v-for="nav in navigations" :key="nav.name">
        <router-link 
          :to="nav.href"
          class="nav-link"
          active-class="active"
        >
          {{nav.name}}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
export default {
  components:{
    Logo
  },
  data(){
    return {
      navigations :[
        {
          name:'Search',
          href:'/'
        },
        {
          name:'Movie',
          href:'/movie/tt0110357'
        },
        {
          name:'About',
          href:'/about'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    .logo {
      margin-right: 40px;
    }
  }
</style>