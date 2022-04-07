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
### vuex
상태관리 라이브러리
