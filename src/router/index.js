import Vue from 'vue'
import Router from 'vue-router'
import Author from '@/components/Author'
//import User from '@/components/User'
// import User from '@/page/User'
//import Advert from '@/page/advert'
//import FAQ from '@/page/FAQ'
const User = () => Promise.resolve(import(/* webpackChunkName: "user" */ "../page/User"));
const Advert = () => Promise.resolve(import(/* webpackChunkName: "user" */ "../page/Advert"));
const ProductDetail = () => Promise.resolve(import(/* webpackChunkName: "other" */ "../components/ProductDetail"));
const productMap = () => Promise.resolve(import(/* webpackChunkName: "other" */ "../components/productMap"));
const Evaluate = () => Promise.resolve(import(/* webpackChunkName: "other" */ "../components/Evaluate"));
const process = () => Promise.resolve(import(/* webpackChunkName: "way" */ "../components/processBind"));
const useProduct = () => Promise.resolve(import(/* webpackChunkName: "way" */ "../components/useProduct"));
const HowToRegister = () => Promise.resolve(import(/* webpackChunkName: "way" */ "../components/HowToRegister"));
const NotBind = () => Promise.resolve(import(/* webpackChunkName: "way" */ "../components/NotBind"));
const ProductTest = () => Promise.resolve(import(/* webpackChunkName: "way" */ "../components/ProductTest"));
const FAQ = () => Promise.resolve(import(/* webpackChunkName: "way" */ "../page/FAQ"));
const follow = () => Promise.resolve(import(/* webpackChunkName: "user" */ "../page/follow"));
const UserConsume = () => Promise.resolve(import(/* webpackChunkName: "member" */ "@/components/UserConsume"));
const jzyhzy = () => Promise.resolve(import(/* webpackChunkName: "member" */"@/components/getCoin-20200120"));
const Getwechatpermissions = () => Promise.resolve(import(/* webpackChunkName: "member" */"@/components/getwechatpermissions"));
const EquipmentLeasing = () => Promise.resolve(import(/* webpackChunkName: "member" */"@/components/EquipmentLeasing"));
const CouponsConvert = () => Promise.resolve(import(/* webpackChunkName: "member" */ "@/components/CouponsConvert"));
// import UserConsume from '@/components/UserConsume'
// import Evaluate from '@/components/Evaluate'
//import ProductDetail from '@/components/ProductDetail'
// import productMap from '@/components/productMap'
// import process from '@/components/processBind'
// import useProduct from '@/components/useProduct'
// import HowToRegister from '@/components/HowToRegister'
// import NotBind from '@/components/NotBind'
// import ProductTest from '@/components/ProductTest'

Vue.use(Router)

export default new Router({
  beforeEach() {
    let allowBack = true    //    给个默认值true
    if (to.meta.allowBack !== undefined) {
      allowBack = to.meta.allowBack
    }
    if (!allowBack) {
      history.pushState(null, null, location.href)
    }
    store.dispatch('updateAppSetting', {
      allowBack: allowBack
    })

  },
  routes: [
    {
      path: '/author',
      name: 'Author',
      component: Author,
      meta:{
          allowBack: false
      }
    },
    {
      path: '/user/:machineId',
      name: 'User',
      component: User,
      meta: {
        keepAlive: false, allowBack: false
      }
    },
    {
      path: '/advert',
      name: 'Advert',
      component: Advert,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/FAQ',
      name: 'FAQ',
      component: FAQ,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/productdetail',
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/productMap',
      name: 'productMap',
      component: productMap,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/evaluate',
      name: 'Evaluate',
      component: Evaluate,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/process',
      name: 'process',
      component: process,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/useProduct',
      name: 'useProduct',
      component: useProduct,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/HowToRegister',
      name: 'HowToRegister',
      component: HowToRegister,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/NotBind',
      name: 'NotBind',
      component: NotBind,
      meta: {
        keepAlive: true, allowBack: false
      }
    },
    {
      path: '/ProductTest',
      name: 'ProductTest',
      component: ProductTest,
      meta: {
        keepAlive: true, allowBack: false
      }
    },
    {
      path: '/follow',
      name: 'follow',
      component: follow,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/UserConsume',
      name: 'UserConsume',
      component: UserConsume,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/getWechatPermissions',
      name: 'getWechatPermissions',
      //redirect: '/getwechatpermissions',
      component: Getwechatpermissions,
      meta: {
        keepAlive: false, allowBack: false
      }
    }, {
      path: '/jzyhzy',
      name: 'jzyhzy',
      //redirect: '/getwechatpermissions',
      component: jzyhzy,
      meta: {
        keepAlive: false, allowBack: false
      }
    }, {
      path: '/EquipmentLeasing',
      name: 'EquipmentLeasing',
      //redirect: '/getwechatpermissions',
      component: EquipmentLeasing,
      meta: {
        keepAlive: false, allowBack: false
      }
    },
    {
      path: '/CouponsConvert',
      name: 'CouponsConvert',
      component: CouponsConvert,
      meta: {
        allowBack: false
      }
    }
    /*    {
      path: '/userconsume',
      name: 'UserConsume',
      component: (resolve) => require(['@/components/UserConsume'], resolve),
    },*/
  ]
})
