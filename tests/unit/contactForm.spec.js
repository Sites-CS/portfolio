/* global describe it expect */
import mountWithI18n from '../helpers/mountWithI18n'
import ContactForm from '~/components/ContactForm'

const wrapper = mountWithI18n(ContactForm)

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

    it('renders submit', () => {
        expect(wrapper.find('[type="submit"]').exists()).toBe(true)
    })

    it('reflects values', async () => {
        fields.forEach(async (field) => {
            const $field = wrapper.get(`[name="${field}"]`)
            const value = Math.random().toString(36).substring(7)

            await $field.setValue(value)

            expect(wrapper.vm.fields[field]).toBe(value)
        })
    })

    it('resets form', () => {
        wrapper.vm.resetForm()

        fields.forEach((field) => {
            expect(wrapper.vm.fields[field]).toBe(null)
        })
    })

    it('displays valid feedback', async () => {
        fields.forEach(async (field) => {
            const $field = wrapper.get(`[name="${field}"]`)
            let value = Math.random().toString(36).substring(7)

            if (field === 'email') {
                value += '@' + Math.random().toString(36).substring(7)
            }

            await $field.setValue(value)

            expect($field.classes('is-valid')).toBe(true)
        })
    })

    it('displays invalid feedback', async () => {
        fields.forEach(async (field) => {
            const $field = wrapper.get(`[name="${field}"]`)

            await $field.setValue('')

            expect($field.classes('is-invalid')).toBe(true)
        })
    })

    it('displays invalid feedback for incorrect email', async () => {
        const $field = wrapper.get('[name="email"]')
        const value = Math.random().toString(36).substring(7)

        await $field.setValue(value)

        expect($field.classes('is-invalid')).toBe(true)
    })

    it('shows spinner when form is sending', async () => {
        await wrapper.setData({
            isSending: true,
        })

        expect(wrapper.find('[type="submit"] .spinner').exists()).toBe(true)
    })

    it('disables submit when form is sending', async () => {
        await wrapper.setData({
            isSending: true,
        })

        expect(wrapper.get('[type="submit"]').element.disabled).toBe(true)
    })
})
