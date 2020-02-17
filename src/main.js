import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import Toast from "components/common/toast"
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload";
//使用自定义的toast插件
Vue.use(Toast)
//解决移动端点击300ms的延迟
FastClick.attach(document.body)
//使用图片懒加载插件
Vue.use(VueLazyLoad,{
  //设置未加载完成时的占位图片
  loading:require("./assets/img/common/placeholder.png")
})
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

