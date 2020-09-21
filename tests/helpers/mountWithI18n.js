import { createLocalVue, mount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import gridsomeConfig from '~/../gridsome.config'

export default function mountWithI18n(component, options) {
    const pluginOptions = gridsomeConfig.plugins.find(plugin => plugin.use === 'gridsome-plugin-i18n')
    delete pluginOptions.use
    delete pluginOptions.options

    pluginOptions.locale = 'fr'
    pluginOptions.messages.fr = require('~/locales/fr.json')

    const localVue = createLocalVue()
    localVue.use(VueI18n)

    const i18n = new VueI18n(pluginOptions)

    if (!options) {
        options = {}
    }

    options.localVue = localVue
    options.i18n = i18n

    return mount(component, options)
}
