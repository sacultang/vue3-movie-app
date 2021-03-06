# VUE3 OMDB MOVIE

## vue-router

사이트에서 페이지를 구분하기 위한 기술

```bash
$ npm install vue-router@4
```

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

## filters

년도 구하기

```js
//즉시 실행 함수
;(() => {
	const years = [] // 빈 배열 생성
	const thisYear = new Date().getFullYear() //date생성자
	for (let i = thisYear; i >= 1985; i--) {
		years.push(i) // push()메소드를 통해 i를 years에 밀어 넣음
	}
	return years
})()
```

v-for

```html
<select class="form-select" v-for="filter in filters" :key="filter.name" v-model="$data[filter.name]">
	<!-- <option value="">All Years</option> // All Years가 movie,number에도 출력됨 -->
	<option value="" v-if="filter.name === 'year'">All Years</option>
	// v-if를 통해 filter.name이 year인 경우에만 출력
	<option v-for="item in filter.items">{{item}}</option>
</select>
```

## axios

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

## vuex(store)

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
store / index.js

import { createStore } from 'vuex'
import movie from './movie.js'
import about from './about.js'

export default createStore({
	modules: {
		movie,
		about,
	},
})
```

```js
movie.js
export default {
	namespaced: true, // 모듈로 사용하겠다
	state: () => {
		//  실제 취급할 data
		return {
			movies: [],
		}
	},
	getters: {
		// computed 계산된 상태
		movieIds(state) {
			//상태 내부에서 데이터에 접근하려면 state 매개 변수 사용해야 함
			return state.movies.map((m) => m.imdbID)
		},
	},

	// methods
	mutations: {
		// 변이 - mutations안에서만 vuex의 state 값을 변경할 수 있음
		// 다른 장소에서 데이터 수정 불가!
		resetMovies(state) {
			state.movies = []
		},
	},
	actions: {
		// 비동기로 동작함
		// searchMovies(context, payload){ //actions에서는 state 바로 불러 올수 없음
		//payload = searchMovies()가 실행될 때 들어오는 인수로 받음
		searchMovies({ state, getters, commit }, payload) {
			//context 객체구조분해
			const { title, type, number, year } = payload
			context.state
			context.getters
			context.commit // mutations를 불러오른 함수 commit
		},
	},
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

## lodash \_uniqBy

중복 아이디 제거

```
$ npm i lodash
```

```js
import _uniqBy from 'lodash/uniqBy'

_uniqBy(배열, '속성 이름')
_uniqBy(Search, 'imdbID')
```

## fetchMovies

searchmovie 뿐만 아니라 다른곳에서도 사용하기 위해
fetchmovie라는 함수를 따로 만들어 활용성을 높인다

```js
function fetchMovies(payload) {
	const { title, type, year, page } = payload
	const OMDIB_API_KEY = 'API_KEY'
	const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
	// 비동기 처리
	return new Promise((resolve, reject) => {
		//resolve 이행 , reject 거부
		aixos
			.get(url)
			.then((res) => {
				resolve(res)
			})
			.catch((error) => {
				reject(error)
			})
	})
	// async await 코드
	return new Promise(async (resolve, reject) => {
		// *주의* async는 await의 함수부분에 작성
		try {
			const res = await axios.get(url)
			resolve(resolve)
		} catch (err) {
			reject(err)
		}
	})
}
```

## $route/params

매개변수로 받는 특정한 주소로 이동

```js
{
  path:'/movie/:이름', // /:매개변수 = 동적으로 변경될수 있는 주소
  component:Movie
}
```

```js
created(){
    // console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithID',{
      id:this.$route.params.id
    })
  }
// searchMovieWithID를 실행할때 params로 받은 id를 payload로 넣는다
```

```js
단일 영화 검색
async searchMovieWithID ({commit,state}, 전달받은 영화 ID){
      if(state.loading) return // loading이 트루면 return하여 함수를 종료
      commit('updateState',{
        theMovie:{}, // 페이지 이동시 데이터가 남아 있을수 있기때문에 객체를 비워줌
        loading:true
      })
      try {
        const res = await _fetchMovie(payload) // fetchmovie 실행시 ID를 전달하여 res에 저장
        commit('updateState',{
          theMovie : res.data
        })
        console.log(res.data)
      }catch(error){
        commit('updateState',{
          theMovie:{} // Error시 객체를 비워줌
        })
      } finally{
        commit('updateState',{
          loading:false // 함수가 실행,실패와 관계없이 작동
        })
      }
    }
```

## plugin 등록

[플러그인이름].js 생성  
src/main.js에 use로 연결  
\$[플러그인이름]으로 사용할 수 있다

```js
src / main.js

import loadImage from './plugins/loadImage'

createApp(App)
	.use(router) // $route, $router
	.use(store) // $store
	.use(loadImage) // $loadImage
	.mount('#app')
```

플러그인 생성  
install()메소드를 이용하여 생성
config.globalProperties에 전역 메소드를 연결

```js
plugins / loadImage.js
export default {
	install(app) {
		app.config.globalProperties.$loadImage = (key) => {
			return 로직
		}
	},
}
```

this.$loadImage 로 사용 할수있다

```js
methods :{
    async init(){
      await this.$loadImage(this.movie.Poster)
      this.imageLoading = false
    }
  }
```

## Page Not Found

잘못된 주소로 접근하였을 경우 router를 통해 not found(component) 페이지를 출력할 수 있다

1. routes 폴더에 NotFound.vue 파일 생성
2. routes/index.js 에 라우트 등록

```js
routes: [
	{
		path: '/:notFound(.*)', // /:[파라미터이름 바꿔도됨](.*)
		// 정규표현식(RegExp)
		// . 임의의 한 문자와 일치
		// * 와일드 카드
		component: NotFound, // NotFound 컴포넌트로 보여줌
	},
]
```

## 모든 컴포넌트에서 전역 스타일 가져오기

컴포넌트마다 @import 해줄필요 없도록 webpack.config.js에 작성해준다

```js

  기존 코드
  module: {
    rules:[
      {
        test:/\.vue$/,
        use: 'vue-loader'
      },
      {
        test:/\.s?css$/,
        use:[
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
```

```js
  수정 코드 // sass-loader를 객체로 바꾼 후 options를 추가 해준다.
  module: {
    rules:[
      {
        test:/\.vue$/,
        use: 'vue-loader'
      },
      {
        test:/\.s?css$/,
        use:[
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader:'sass-loader', // 순서 1. sass loader
            options:{
              additionalData: '@import "~/scss/main";'
            }
          }
        ]
      }
```

## Vuex Helpers

store에 등록되어있는 데이터를 간소화 해서 호출해주는 vuex에서 제공하는 기능  
https://vuex.vuejs.org/guide/state.html

### mapState

```js
import { mapState } from 'vuex'

computed:{
    // image(){
    //   return this.$store.state.about.image
    // },
    // name(){
    //   return this.$store.state.about.name
    // },
    // email(){
    //   return this.$store.state.about.email
    // },
    반복되는 코드를 정리해 줄 수 있음

    ...mapState('모듈',[ // 전개 연산자 중요
      'image',
      'name',
      'email'
    ])
}
```

## Scroll Behavior

routes/index.js 에 작성 해준다
페이지 이동시 스크롤값 초기화

```js
export default createRouter({
	// 작성부분
	scrollBehavior() {
		return { top: 0 }
	},
})
```

## Vue Router 정리

https://router.vuejs.org/api/

### \<RouterView>

페이지가 출력되는 영역 컴포넌트

### \<RouterLink>

html의 a태그와 같다

### $route

Route(페이지) 정보를 가지는 객체

- ex) fullPath, params

### $router

Route(페이지) 조작을 위한 객체

### 도메인

https://google.com/blog/123?apikey=abcd0987&name=HEROPY

fullPath 부분 = /blog/123?apikey=abcd0987&name=HEROPY

fullPath의 parmas = /blog/123

fullPath의 queryString = ?apikey=abcd0987&name=HEROPY

## Mixed Content issue

netlify 배포 후 검색요청 했는데

```
This request has been blocked; the content must be served over HTTPS.
```

에러 뜸<br>

검색해보니 https로 통신하다가 http로 연결되는 통신이 중간에 발생하면 보안정책에 의해 browser에서 block 된단다.

해결법

1. 일단 omdb 요청 주소에 https로 바꾸고 다시 요청했더니 잘 됨.
1. omdb주소에 https로 안바꾸고 index.html 에 \<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> 태그 추가 해주니 잘 됨

## Netlify Server-side Functions

https://docs.netlify.com/functions/overview/

netlify.toml 파일 생성후 설정한다

```bash
$ npm i -D netlify-cli
```

```toml
# Netlify Dev
# https://cli.netlify.com/netlify-dev#netlifytoml-dev-block

# 제품 모드
[build]
  command = "npm run build"
  functions = "functions" # Netlify 서버리스 함수가 작성된 디렉토리를 지정합니다.
  publish = "dist" # 프로젝트 빌드 결과의 디렉토리를 지정합니다.

# 개발 모드
[dev]
  framework = "#custom" # 감지할 프로젝트 유형을 지정합니다. 앱 서버 및 'targetPort' 옵션을 실행하는 명령 옵션은
  command = "npm run dev" # 연결할 프로젝트의 개발 서버를 실행하는 명령(스크립트)을 지정합니다.
  targetPort = 8080 # 연결할 프로젝트 개발 서버의 포트를 지정합니다.
  port = 8888 # 출력할 Netlify 서버의 포트를 지정합니다
  publish = "dist" # 프로젝트의 정적 콘텐츠 디렉토리를 지정합니다.
  autoLaunch = false # Netlify 서버가 준비되면 자동으로 브라우저를 오픈할 것인지 지정합니다.

```

### direcotry/js파일

- body 안에는 문자 데이터만 할당 가능 객체 데이터를 할당 하고 싶다면 JSON.stringify()로 객체를 반환한다

```js
// 비동기로 작성해야 정상 작동함
exports.handler = async function (event, context) {
	// your server-side functionality
	return {
		statusCode: 200,
		body: JSON.stringify({
			name: 'Heropy',
			age: 85,
			email: 'sacultang@gmail.com',
		}),
	}
}
```

### functions/movie

1. 영화검색요청을 위해 store/movie에 \_fetchMovie()를 작성했었다.
2. \_fetchMovie() 안의 로직들을 서버리스 함수쪽으로 이관한다
   1. 서버리스함수(functions/movie.js)에서 axios 패키지 사용 할 수 있게 해야함
3. 서버리스 함수는 이미 async 붙어있는 비동기 함수이다
4. body 부분에는 문자데이터만 반환 가능하다
5. 서버리스함수를 실행할때 인수로 {title,type,page,year,id}를 얻어 오는 방법

   1. payload 변수에 event.body정보를 할당한다
   1. 주의점 event.body는 문자데이터기 때문에 JSON.parse()로 객체 데이터로 변환 해서 할당한다

6. store/movie.js 에서 서버리스함수로 요청이 들어갈수 있도록 수정해준다
   1. axios.post('/.netlify/functions/movie',payload)
   - get & post 차이점
     - get?title={}&page={} 쿼리스트링부분을 포함해서 요청 (즉, 요청하는 주소에 정보를 포함해서 요청)
     - post body라는 부분에 담아서 전송한다

```js
functions/movies.js에 작성

const axios = require('axios') // nodeJs 환경이기 때문에 require 로 가져오기 // exports 로 내보내기
exports.handler = async function(event){
  // console.log(event)
  const payload = JSON.parse(event.body) // payload라는 변수로 event.body의 정보를 할당한다
  const {title,type,page,year,id} = payload
  const url = id
    ? `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url)
    if(data.Error){
      return {
        statusCode: 400, // 잘못된 요청 처리에 대한 코드
        body:data.Error // body는 문자데이터만 반환가능 {},[]는 정상 작동 안함
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }
  catch(error){
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}
//  const {title,type,page,year,id} = payload
//   const OMDB_API_KEY = 'f6573a61'
//   const url = id
//     ? `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
//     : `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
//   // const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

//   return new Promise((resolve,reject)=>{
//     axios.get(url)
//       .then((res)=>{
//         // console.log(res)
//         if(res.data.Error){
//           reject(res.data.Error)
//         }
//         resolve(res)
//       })
//       .catch((error) => {
//         reject(error.message)
//       })
```

### store/movie.js \_fetchMovie() 수정해 준다

```js
store/movie.js에 수정

async function _fetchMovie(payload){
  return await axios.post('/.netlify/functions/movie',payload)
}
```

## 로컬 및 서버의 환경변수 구성

중요한 정보 [ex)apikey]를 숨겨주기 위한 설정

### 로컬에서 환경변수 설정

```
$ npm i -D dotenv-webpack
```

webpack.config.js에 작성

```js
const Dotenv = require('dotenv-webpack')
plugins: [new Dotenv()]
```

root 경로에 .env 파일 생성

```
.env파일 내부에 키값을 적어 넣는다
OMDB_API_KEY=f6573a61
```

functions/movie.js에 작성

```js
const OMDB_API_KEY = process.env.OMDB_API_KEY
|| 객체 구조분해 해서 간단하게 작성 가능
const {OMDB_API_KEY} = process.env
```

.gitingore에 .env 추가

### Netlify 서버에서 환경 설정

1. Site settings 탭으로 이동
1. 사이드 Build & deploy 탭 내부의 Enviroment
1. Edit variables click
