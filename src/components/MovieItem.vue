<template>
  <div class="movieItem">
    {<p class="movieTitle">{{movie.Title}}</p>
    <img :src=movie.Poster alt="" class="moviePoster">
    <p class="movieYear">{{movie.Year}}</p>}
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type:Object,
      // default: ()=>({})
      default : ()=>{
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .movieItem {
    width: 300px;
    position: relative;
    text-align: center;
    margin: 40px 0;
    border-radius: 5%;
    overflow: hidden;
    .movieTitle {
      position: absolute;
      bottom: 30px;
    }
    img{

    }
    .movieYear {
      position: absolute;
      bottom: 20px;
    }
  }
</style>