import router from './router'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {Toast, Popup, Loadmore,MessageBox } from 'mint-ui';
Vue.component(Toast.name, Toast);
Vue.component(Popup.name, Popup);
Vue.component(Loadmore.name, Loadmore);
Vue.component(MessageBox .name, MessageBox );
import VueResource from 'vue-resource'
Vue.use(VueResource);
import {getCookie, setCookie} from "./util/util"
import store from "./vuex/store"

Vue.config.productionTip = false;
// 全局导航钩子
router.beforeEach((to, from, next) => {
  setCookie('mapptCloseIt', '0');
  var _path = to.fullPath;
  if (_path.indexOf('user') > 0) {
    console.log(_path);
    let machineId = _path.substring(6);
    console.log(machineId);
    if(machineId.length >= 5 && machineId.length < 10 && machineId !== 'reback'){
      console.log('set a machineId');
      setCookie("machineId", machineId)
    }
  }

  if (to.path === '/useProduct') {
    next();
  }
  if (to.path === '/author' && store.state.id) {
    // 用户使用后退返回到授权页，则默认回到首页
    const mapptUser = getCookie('mapptUser');
    const url = '/user/' + mapptUser;
    next(url);
  }

  if ((!getCookie('mapptUser') || !store.state.id) && to.path !== '/author') {
    // 第一次进入项目
    setCookie('beforeLoginUrl', to.fullPath)
    // 保存用户进入的url
    next('/author');
  } else if (!store.state.id && to.path !== '/author') {
    // 之前有获取过授权
    setCookie('beforeLoginUrl', to.fullPath)
    // 保存用户进入的url
    next('/author')
  }
  if (to.path === '/process' && store.state.id) {
    next()
  }

  Vue.http.interceptors.push((request, next) => {
    if(request.url !=='/list/PAY'){
       // request.url = 'http://localhost:8080/vifws_c/wwj.json'
       request.url = 'http://zfb.hzhltec.com/vrsws/wwj.json'
      // request.url = 'http://112.17.64.115:7777/vrsws/wwj.json'
    }
    next((response) => {
      return response
    })
  })

  next();
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    location.href = 'http://zfb.hzhltec.com/#/user/' + getCookie('machineId')
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
});
