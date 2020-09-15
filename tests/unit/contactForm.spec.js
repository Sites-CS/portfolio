import { shallowMount } from '@vue/test-utils'
import ContactForm from '~/components/ContactForm'

const wrapper = shallowMount(ContactForm)

const fields = [
    'name',
    'email',
    'subject',
    'message',
]

describe('ContactForm', () => {
    it('renders form', () => {
        expect(wrapper.find('[name="name"]').exists()).toBe(true)
    })

    it('renders fields', () => {
        fields.forEach((field) => {
            expect(wrapper.find(`[name="${field}"]`).exists()).toBe(true)
        })
    })

    it('reflects values', () => {
        fields.forEach((field) => {
            const $field = wrapper.get(`[name="${field}"]`)
            const value = Math.random().toString(36).substring(7)

            $field.setValue(value)

            expect(wrapper.vm.fields[field]).toBe(value)
        })
    })
})
