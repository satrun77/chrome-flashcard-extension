import Vue from 'vue'
import root from './root.vue'
import {Model} from 'vue-api-query'
import Vuetify from 'vuetify'
import Storage from '../ext/storage'
import Defaults from '../ext/defaults'

window.axios = require('axios')

// inject global axios instance as http client to Model
Model.$http = window.axios

Vue.use(Vuetify, {
  theme: {
    ...Defaults.themes,
    ...Storage.get('themes')
  }
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(root)
})
