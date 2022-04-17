<template>
  <header>
    <Logo></Logo>
    <div class="nav nav-pills">
      <div class="nav-item" v-for="nav in navigations" :key="nav.name">
        <router-link 
          :to="nav.href"
          class="nav-link"
          active-class="active"
          :class="{active: isMatch(nav.path)}"
        >
          {{nav.name}}
        </router-link>
      </div>
    </div>
    <div class="user" @click="toAbout">
      <img :src="image" :alt="name">
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
import { mapState } from 'vuex'
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
          href:'/movie/tt0110357',
          path:/^\/movie/ // '/movie'로 시작하는 일치

        },
        {
          name:'About',
          href:'/about'
        }
      ]
    }
  },
  methods:{
    isMatch(path){
      if(!path) return false
      // console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout(){
      this.$router.push('/about')
    }
  },
  computed:{
    ...mapState('about',[
      'image',
      'name'
    ])
    // image(){
    //   return this.$store.state.about.image
    // },
    // name(){
    //   return this.$store.state.about.name
    // }
  }
}
</script>
<style lang="scss" scoped>

  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
      margin-right: 40px;
    }
    .user {
      width: 40px;
      height: 40px;
      padding: 6px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      margin: auto;
      transition:.4s;
      &:hover {
        background-color: darken($gray-200, 10%);
      }
      img{
        width: 100%;
      }
    }
    @include media-breakpoint-down(sm){
      .nav{
        display:none
      }
    }
  }
</style>