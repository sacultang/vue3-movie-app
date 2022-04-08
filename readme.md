# VUE3 OMDB MOVIE

### vue-router
사이트에서 페이지를 구분하기 위한 기술
```js
main.js 에 작성

  import router from './routes/index.js'

  createApp(App).use(router).mount('#app')

  use() 특정한 플러그인을 연결할때 사용하는 메소드
```
- Hash  
https://google.com/#/search  
주소에 #/ 를 붙여서 해당하는 페이지로 접근하는 모드  
특정 페이지에서 새로고침했을때 페이지 찾을 수 없다는 메세지를 방지
```js
routes/index.js 에 작성
  import {createRouter, createWebHashiHisotry} from 'vue-router'
  import Home from './Home'
  import About from './About'

  export default createRouter({
    history:createWebHashHistory(),
    routes:[
      {
        path:'/', // index
        component:Home
      },
      {
        path:'/about',
        component:About
      }
    ]
  })
```
### filters 
년도 구하기
```js
  //즉시 실행 함수
  (() => {
    const years = [] // 빈 배열 생성
    const thisYear = new Date().getFullYear() //date생성자
    for (let i = thisYear; i >= 1985; i--){
      years.push(i) // push()메소드를 통해 i를 years에 밀어 넣음
    }
    return years
  })()
```
v-for
```html
<select 
  class="form-select" 
  v-for="filter in filters" 
  :key="filter.name" 
  v-model="$data[filter.name]"
>
  <!-- <option value="">All Years</option> // All Years가 movie,number에도 출력됨 -->
  <option value="" v-if="filter.name === 'year'">All Years</option> // v-if를 통해 filter.name이 year인 경우에만 출력
  <option v-for="item in filter.items">{{item}}</option>
</select>
```
### axios 
http 요청
```
$ npm i axios
```
```js
import axios from 'axios'

methods: {
  apply(){
    axios.get('http://www.omdbapi.com/?apikey=[yourkey]&')
  }
}
```
### vuex(store)
상태관리 라이브러리

```
$ npm i vuex@next // 3버전
```
```js
store/index.js 를 main.js에 연결
src/main.js

import store from './store/index.js'

createApp(App)
  .use(store)
```
```js
store/index.js

import {createStore} from 'vuex'
import movie from './movie.js'
import about from './about.js'

export default createStore {
  modules: {
    movie,
    about
  }
}
```
```js
movie.js
export default {
  namespaced:true, // 모듈로 사용하겠다
  state:  () => {  //  실제 취급할 data
    return {
      movies: []
    }
  },
  getters:{ // computed 계산된 상태
    movieIds(state){ //상태 내부에서 데이터에 접근하려면 state 매개 변수 사용해야 함
      return state.movies.map(m => m.imdbID)
    }
  }, 

  // methods
  mutations:{
    // 변이 - mutations안에서만 vuex의 state 값을 변경할 수 있음
    // 다른 장소에서 데이터 수정 불가!
    resetMovies(state){
      state.movies = []
    }
  }, 
  actions:{
    // 비동기로 동작함
    // searchMovies(context, payload){ //actions에서는 state 바로 불러 올수 없음
                                      //payload = searchMovies()가 실행될 때 들어오는 인수로 받음
    searchMovies({state,getters,commit},payload){ //context 객체구조분해
      const {title,type,number,year} = payload
      context.state
      context.getters
      context.commit // mutations를 불러오른 함수 commit
    }
  }
}
```
실제 컴포넌트 안 메소드에서 actions를 실행할때 dispatch()메소드
```js
  methods:{
    async apply(){
      this.$store.dispatch('movie/searchMovies',{  //('모듈/actions',payload)

      })
    } 
  }
```
```js
  Object.keys() 객체데이터의 이름을 받아 새로운 배열로 만들어줌
```

### lodash _uniqBy
중복 아이디 제거

```
$ npm i lodash
```
```js
  import _uniqBy from 'lodash/uniqBy'

  _uniqBy(배열,'속성 이름')
  _uniqBy(Search,'imdbID')
```
