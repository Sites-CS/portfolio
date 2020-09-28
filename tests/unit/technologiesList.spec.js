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

    // TODO: Need to find a way to access to link property, here a button is rendered and we don't have any access to the link.
    // it('renders fields', () => {
    // Maybe there is away to get props('to'), but I can't pass this error : [vue-test-utils]: wrapper.props() cannot be called on a mounted functional component.
    // const to = wrapper.find('.technologies-list-item-link').html()
    //
    // console.log(to)
    // tech.node.path
    // })
})
