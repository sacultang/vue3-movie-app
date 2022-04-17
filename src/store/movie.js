import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'
export default {
  namespaced:true, // module!
  state:()=>{ // 취급해야 될 실제 데이터
    return {
      movies: [],
      message:'Search for the Movie Title!',
      loading:false,
      theMovie:{}
    }
  }
  , 
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
    async searchMovies({commit, state}, payload){
      if(state.loading){
        return
      }
      commit('updateState',{
        message:'',
        loading:true
      })
      try {
        const res = await _fetchMovie({
          ...payload,
          page:1
        })
        const {Search, totalResults} = res.data
        commit('updateState', {
          movies:_uniqBy(Search,'imdbID')
        })
        // console.log(totalResults) // 560
        // console.log(typeof totalResults) // renderToString
        const total = parseInt(totalResults,10)
        const pageLength = Math.ceil(total / 10)
  
        // 추가 요청 전송!
        if (pageLength > 1){
          for (let page = 2; page <=pageLength; page++){
            if(page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const {Search} = res.data
            commit('updateState',{
              movies: [...state.movies, ..._uniqBy(Search,'imdbID')]
            })
          }
        }
      }
      catch(message){
        commit('updateState',{
          movies:[],
          message
        })
      }
      finally{
        commit('updateState',{
          loading:false
        })
      }
    },
    async searchMovieWithID ({commit,state}, payload){
      if(state.loading) return
      commit('updateState',{
        theMovie:{},
        loading:true
      })
      try {
        const res = await _fetchMovie(payload)
        commit('updateState',{
          theMovie : res.data
        })
        // console.log(res.data)
      }catch(error){
        commit('updateState',{
          theMovie:{}
        })
      } finally{
        commit('updateState',{
          loading:false
        })
      }
    }
  }
}

function _fetchMovie(payload){
  const {title,type,page,year,id} = payload
  const OMDB_API_KEY = 'f6573a61'
  const url = id 
    ? `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  // const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  return new Promise((resolve,reject)=>{
    axios.get(url)
      .then((res)=>{
        // console.log(res)
        if(res.data.Error){
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch((error) => {
        reject(error.message)
      })
  })
  // return new Promise(async (res,rej)=>{
  //   try{
  //     const result = await axios.get(url)
  //     res(result)
  //   }
  //   catch(err){
  //     rej('Error Message!!!!!!',err.message)
  //   }
  // })
}