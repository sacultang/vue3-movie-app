import axios from 'axios'
export default {
  namespaced:true,
  state: () => {
    return {
      movies : []
    }
  },
  getters :{},
  mutations :{
    updateState(state,payload){
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]

      })
    }
  },
  actions:{
    async searchMovies({state, commit}, payload){
      const {title,type,year,number} = payload
      const OMDB_API_KEY = 'f6573a61'
      const res = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      console.log(res)
      const { Search, totalResults } = res.data
      commit('updateState',{
        movies:Search
      })

      const total = parseInt(totalResults , 10)
      const pageLength = Math.ceil(total / 10) //ceil 올림 처리

      // 추가 요청

      if( pageLength > 1){
        for (let page = 2; page <= pageLength; page++){
          if (page > (number / 10)){
            break
          }
          const res = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          commit('updateState', {
            movies:[...state.movies,...Search]
          })
        }
      }
    }
  }
}