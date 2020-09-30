<template>
    <div>
        <technologies-list
            :list="allTechnologies"
            :selected="selectedTechnologies"
            @selected="setSelectedTechnologies"
        />

        <categories-list
            :list="allCategories"
            :selected="selectedCategories"
            @selected="setSelectedCategories"
        />
        <b-row
            cols="1"
            cols-md="2"
            cols-xl="3"
        >
            <b-col
                v-for="(creation, index) in getFilteredElements"
                :key="`creations-list-item-${index}`"
            >
                <b-card
                    class="my-4"
                    no-body
                >
                    <g-image
                        class="creations-list-item-coverImage card-img"
                        :src="creation.node.coverImage"
                        alt=""
                    />

                    <b-card-body>
                        <b-card-title
                            tag="h3"
                            class="creations-list-item-title h4"
                        >
                            {{ creation.node.title }}
                        </b-card-title>

                        <b-card-text class="creations-list-item-date">
                            {{ creation.node.date }}
                        </b-card-text>

                        <b-card-text class="creations-list-item-excerpt">
                            {{ creation.node.excerpt }}
                        </b-card-text>

                        <b-button
                            :to="creation.node.path"
                            class="creations-list-item"
                            block
                            variant="primary"
                        >
                            {{ $t('portfolio.viewItem') }}
                        </b-button>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {
    BButton,
    BCard,
    BCardBody,
    BCardTitle,
    BCardText,
    BCol,
    BRow,
} from 'bootstrap-vue'
import TechnologiesList from '~/components/TechnologiesList.vue'
import CategoriesList from '~/components/CategoriesList.vue'

export default {
    components: {
        BButton,
        BCard,
        BCardBody,
        BCardTitle,
        BCardText,
        BCol,
        BRow,
        TechnologiesList,
        CategoriesList,
    },
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedTechnologies: null,
            selectedCategories: null,
        }
    },
    computed: {
        getFilteredElements() {
            let filteredList = []

            if (this.selectedTechnologies && !this.selectedCategories) {
                filteredList = this.list.filter(element => {
                    let isConcerned = false
                    this.selectedTechnologies.forEach(technology => {
                        isConcerned = isConcerned || element.node.technologies.includes(this.itemToSlug(technology))
                    })
                    return isConcerned
                })
            }
            else if (this.selectedCategories && !this.selectedTechnologies) {
                filteredList = this.list.filter(element => {
                    let isConcerned = false
                    this.selectedCategories.forEach(category => {
                        isConcerned = isConcerned || element.node.technologies.includes(this.itemToSlug(category))
                    })
                    return isConcerned
                })
            }
            else if (this.selectedCategories && this.selectedTechnologies) {
                filteredList = this.list.filter(element => {
                    let isConcerned = false
                    this.selectedCategories.forEach(category => {
                        isConcerned = isConcerned || element.node.categories.includes(this.itemToSlug(category))
                    })
                    this.selectedTechnologies.forEach(technology => {
                        isConcerned = isConcerned || element.node.technologies.includes(this.itemToSlug(technology))
                    })
                    return isConcerned
                })
            }
            else {
                filteredList = [...this.list]
            }

            return filteredList
        },
        allTechnologies() {
            if (!this.$page.technologies || !this.$page.technologies.edges) {
                return []
            }

            return this.$page.technologies.edges
        },
        allCategories() {
            if (!this.$page.categories || !this.$page.categories.edges) {
                return []
            }

            return this.$page.categories.edges
        },
    },
    methods: {
        itemToSlug(item) {
            return item.node.path.replace(/.*\/([^\/]*)\/$/g, '$1')
        },
        addFilters() {
            this.selectedTechnologies = this.selectedTechnologies && this.selectedTechnologies.length > 0 ? this.selectedTechnologies : null
            this.selectedCategories = this.selectedCategories && this.selectedCategories.length > 0 ? this.selectedCategories : null

            let technologiesSlug
            let categoriesSlug

            if (this.selectedCategories && this.selectedTechnologies) {
                technologiesSlug = this.selectedTechnologies.map(this.itemToSlug).join(',')
                categoriesSlug = this.selectedCategories.map(this.itemToSlug).join(',')
                this.$router.push({ path: 'portfolio', query: { technologies: technologiesSlug , categories: categoriesSlug }})
            } else if (this.selectedTechnologies) {
                technologiesSlug = this.selectedTechnologies.map(this.itemToSlug).join(',')
                this.$router.push({ path: 'portfolio', query: { technologies: technologiesSlug }})
            } else if (this.selectedCategories) {
                categoriesSlug = this.selectedCategories.map(this.itemToSlug).join(',')
                this.$router.push({ path: 'portfolio', query: { categories: categoriesSlug }})
            } else {
                this.$router.push({ path: 'portfolio'})
            }

        },
      	setSelectedTechnologies(technologies) {
            this.selectedTechnologies = technologies
            this.addFilters()
        },
      	setSelectedCategories(categories) {
            this.selectedCategories = categories
            this.addFilters()
        },
    },
}
</script>
