import { createRouter , createWebHashHistory } from "vue-router";
import Home from './Home'
import About from './About'
import Movie from './Movie'

export default createRouter({
  // Hash https://google.com/#/search 특정페이지에서 새로고침했을때 페이지찾을수 없다는 메시지 방지 할수 있다
  // History 서버에 세팅을 해야함
  history:createWebHashHistory(),
  routes :[
    {
      path:'/', // index
      component:Home
    },
    {
      path:'/movie/:id', // /:매개변수 = 동적으로 변경될수 있는 주소
      component:Movie
    },
    {
      path:'/about',
      component:About
    }
  ]
})