<template>
  <div class="container">
    <div class="inner" :class="{ 'no-result': !movies.length}">
      <Loader v-if="loading"></Loader>
      <div class="message" v-if="message">{{message}}</div>
      <div class="movies" v-else>
        <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie"></MovieItem>
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'
import { mapState } from 'vuex'
export default {
  components: {
    MovieItem,
    Loader
  },
  computed: {
    ...mapState('movie',[
      'movies',
      'message',
      'loading'
    ])
    // movies() {
    //   return this.$store.state.movie.movies // $store.상태.movie모듈.movies데이터
    // },
    // message(){
    //   return this.$store.state.movie.message
    // },
    // loading(){
    //   return this.$store.state.movie.loading
    // }
  }
}
</script>
<style lang="scss" scoped>
 
  .container{
    margin-top: 30px;
    .inner{
      background-color: $gray-200;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      &.no-result {
        padding:70px 0;
      }
    }
    .message {
      color:$gray-400;
      font-size: 20px;
    }
    .movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>