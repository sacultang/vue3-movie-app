<template>
  <div class="container">
    <div class="inner">
      <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie"></MovieItem>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
export default {
  components: {
    MovieItem
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies // $store.상태.movie모듈.movies데이터
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{

    .inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>