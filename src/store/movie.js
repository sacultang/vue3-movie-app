import axios from 'axios'
export default {
  namespaced:true, // module!
  state:()=>{
    return {
      movies: [],
      message:'',
      loading:false
    }
  }
  , // 취급해야 될 실제 데이터
  getters:{}, // computed 계산된 데이터
  mutations:{ // methods! 변이
    resetMovies(state){
      state.movies = []
    },
    updateState(state, payload){
      // ['movies','message','loading']
      Object.keys(payload).forEach(key => {
        state[key]= payload[key]
      })
    }
  }, 
  actions:{ // methods! // 비동기로 처리 된다
    async  searchMovies({commit, state}, payload){
      const {title , type, number, year} = payload
      const OMDB_API_KEY = 'f6573a61'
      const res = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const {Search, totalResults} = res.data
      commit('updateState', {
        movies:Search
      })
      console.log(totalResults) // 560
      console.log(typeof totalResults) // renderToString
      const total = parseInt(totalResults,10)
      const pageLength = Math.ceil(total / 10)

      // 추가 요청 전송!
      if (pageLength > 1){
        for (let page = 2; page <=pageLength; page++){
          if(page > (number / 10)) break
          const res = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const {Search} = res.data
          commit('updateState',{
            movies: [...state.movies, ...Search]
          })
        }
      }
    }
  }  
}