import vuex from 'vuex'
import Vue from 'vue'
Vue.use(vuex)

import state from './state'
import actions from './actions'
import mutations from './mutations'

export default new vuex.Store({
    state,
    actions,
    mutations
})