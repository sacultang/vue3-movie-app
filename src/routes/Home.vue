<template>
    <Headline></Headline>
    <Search></Search>
    <MovieList></MovieList>
</template>

<script>
  import Headline from '~/components/Headline'
  import Search from '~/components/Search'
  import MovieList from '~/components/MovieList'
  export default {
    components:{
      Headline,
      Search,
      MovieList
    }
  }
</script>

<style lang="scss" scoped>

</style>