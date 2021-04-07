import Vue from 'vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

//require('vue2-animate/dist/vue2-animate.min.css')

import App from './App.vue'

import router from './router'

import AsyncComputed from 'vue-async-computed';
Vue.use(AsyncComputed);

import axios from 'axios';
Vue.prototype.axios = axios;

import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    //'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
    'css/print.css',
    //'http://ugnii.ungg.net/css/print.css'
  ]
}
Vue.use(VueHtmlToPaper,options);


const settings = {
  apiKey: '87f0c584-b91c-4d20-b567-971184db4b3c',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}
import YmapPlugin from 'vue-yandex-maps'
Vue.use(YmapPlugin, settings)

import VueCoreVideoPlayer from 'vue-core-video-player'
Vue.use(VueCoreVideoPlayer)

import VueStripeMenu from 'vue-stripe-menu'
Vue.use(VueStripeMenu)
import 'vue-stripe-menu/dist/vue-stripe-menu.css'

//import vuescroll from 'vuescroll';
//Vue.use(vuescroll);

import VueAnimate from 'vue-animate-scroll'
Vue.use(VueAnimate)

//import SmoothScrollbar from 'vue-smooth-scrollbar'
//Vue.use(SmoothScrollbar)

import VueLazyload from 'vue-lazyload'

//Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/load-error100.png'),
  loading: require('./assets/images/loading100.gif'),
  attempt: 1
})

import pdf from 'vue-pdf'
Vue.use(pdf);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

window.colors = [
  {darkColor: "106, 107, 131"}
]
