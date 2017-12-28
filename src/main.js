import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import router from './router'
import Snotify from 'vue-snotify';
import store from './store';
import 'font-awesome/css/font-awesome.css';
import 'vue2-animate/dist/vue2-animate.min.css';
import { isLogined } from './api/user/user';
import {Select, DatePicker, Option} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Option);
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(Snotify);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    isLogined().then(res => {
      if(res.data.code === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.user);
        next();
      }else {
        next({path: '/loginORregister/login'});
      }
    })
  }
  next();
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
