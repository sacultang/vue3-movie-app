<template>
  <div class="about">
    <div class="photo">
      <Loader v-if="imageLoading" absolute></Loader>
      <img :src="image" :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ git }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
  import Loader from '~/components/Loader';
  import { mapState } from 'vuex';
  export default {
    components: {
      Loader,
    },
    data() {
      return {
        imageLoading: true,
      };
    },
    computed: {
      // ...mapState('모듈',['내용','내용'])
      ...mapState('about', ['image', 'name', 'email', 'git', 'phone']),

      // image(){
      //   return this.$store.state.about.image
      // },
      // name(){
      //   return this.$store.state.about.name
      // },
      // email(){
      //   return this.$store.state.about.email
      // },
      // git(){
      //   return this.$store.state.about.git
      // },
      // phone(){
      //   return this.$store.state.about.phone
      // }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        await this.$loadImage(this.image);
        this.imageLoading = false;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .about {
    text-align: center;
    .photo {
      width: 250px;
      height: 250px;
      margin: 40px auto 20px;
      padding: 30px;
      border: 10px solid $gray-300;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      position: relative;
      img {
        width: 100%;
      }
    }
    .name {
      font-size: 40px;
      font-family: 'oswald', sans-serif;
      margin-bottom: 20px;
    }
  }
</style>
