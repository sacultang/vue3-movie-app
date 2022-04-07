import {createApp} from 'vue'
import App from './App'
import router from './routes'
import store from './store/index'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')