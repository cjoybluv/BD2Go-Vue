import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretDown,
  faCaretRight,
  faEllipsisV,
  faPencilAlt,
  faPlus,
  faSave,
  faUser
} from '@fortawesome/free-solid-svg-icons'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

library.add(faCaretDown)
library.add(faCaretRight)
library.add(faEllipsisV)
library.add(faPencilAlt)
library.add(faPlus)
library.add(faSave)
library.add(faUser)
Vue.component('font-awesome-icon', FontAwesomeIcon)
