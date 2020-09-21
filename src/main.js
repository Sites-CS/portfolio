/**
 * This is the main.js file. Import global CSS and scripts here.
 * The Client API can be used here. Learn more: gridsome.org/docs/client-api
 *
 * We use tree shaking with Bootstrap
 * @see https://bootstrap-vue.org/docs#tree-shaking-with-module-bundlers
 */

import 'normalize.css'
import '~/assets/scss/all.scss'

import VueScrollTo from 'vue-scrollto'

import DefaultLayout from '~/layouts/Default.vue'

export default function(Vue, { appOptions }) {
    Vue.use(VueScrollTo)

    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout)

    appOptions.i18n.setLocaleMessage('fr', require('./locales/fr.json'))
}
