/* global describe it expect */
import mountWithI18n from '../helpers/mountWithI18n'
import TechnologiesList from '~/components/TechnologiesList'

const fakeList = [
    {
        node: {
            title: 'test',
            coverImage: 'test',
        },
    },
]

const wrapper = mountWithI18n(TechnologiesList, {
    propsData: {
        list: fakeList,
    },
    stubs: ['g-link', 'g-image'],
})

const fields = [
    'title',
    'coverImage',
]

describe('TechnologiesList', () => {
    it('renders form', () => {
        expect(wrapper.props().list).not.toHaveLength(0)
    })


    it('renders fields', () => {
        const cardsArray = wrapper.findAll('.technologies-list-item-card')

        cardsArray.wrappers.forEach((card, index) => {
            fields.forEach((field) => {
                if (field === fields[1])
                    expect(card.find(`.technologies-list-item-${field}`).element.getAttribute('src')).toBe(fakeList[index].node[field])
                else
                    expect(card.find(`.technologies-list-item-${field}`).text()).toBe(fakeList[index].node[field])
            })
        })
    })
})
