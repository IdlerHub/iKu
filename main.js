import './static/sdk/ald-stat'
import Vue from 'vue'
import App from 'App'
import store from '@/store'
import pages from '@/utils/pages'
import request from '@/utils/request'
import apis from '@/utils/apis'
import * as Tool from '@/utils/Tool'
import { imgProcess } from '@/utils/imgProcess'

import Bus from '@/utils/Bus'

Vue.config.productionTip = false

Vue.prototype.$toast = pages.toast
Vue.prototype.$nav = pages.nav

Vue.prototype.get = request.loginHttpGet
Vue.prototype.post = request.loginHttpPost
Vue.prototype.httpGet = request.httpGet
Vue.prototype.httpPost = request.httpPost
Vue.prototype.login = request.login
Vue.prototype.api = apis.getApi
Vue.prototype.$Tool = Tool
Vue.prototype.$imgProcess = imgProcess
Vue.use(Bus)

Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
