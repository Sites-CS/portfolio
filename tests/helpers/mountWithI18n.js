import { createLocalVue, mount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import gridsomeConfig from '~/../gridsome.config'

export default function mountWithI18n(component, options) {
    const pluginOptions = gridsomeConfig.plugins.find(plugin => plugin.use === 'gridsome-plugin-i18n').options

    pluginOptions.locale = 'fr'
    pluginOptions.messages.fr = require('~/locales/fr.json')

    const localVue = createLocalVue()
    localVue.use(VueI18n)
    localVue.use(VueRouter)
    localVue.use(BootstrapVue)

    const i18n = new VueI18n(pluginOptions)
    const router = new VueRouter()

    if (!options) {
        options = {}
    }

    options.localVue = localVue
    options.i18n = i18n
    options.router = router

    return mount(component, options)
}
