import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

// 使用 vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  count: 0,
  id:null
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  ADD_ADD(state) {
    state.count += state.count+1 ;
    console.info(state.count );
  },
  setUserId(state,id){
    state.id = id;
  }
};

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以链接到我们的应用中
export default new Vuex.Store({
  actions,getters,
  state, mutations
})
