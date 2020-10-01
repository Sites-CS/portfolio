<template>
    <div>
        <div v-if="showFilters">
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
        </div>
        <b-row
            cols="1"
            cols-md="2"
            cols-xl="3"
        >
            <b-col
                v-for="(creation, index) in filteredList"
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
                            :title-tag="titleTag"
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
        titleTag: {
            type: String,
            required: true,
        },
        showFilters: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectedTechnologies: null,
            selectedCategories: null,
        }
    },
    computed: {
        filteredList() {
            let filteredList = []

            if (this.selectedCategories || this.selectedTechnologies) {
                filteredList = this.list.filter(this.isElementConcerned)
            }
            else {
                filteredList = this.list
            }

            return filteredList
        },
        allTechnologies() {
            return (!this.$page.technologies || !this.$page.technologies.edges) ? [] : this.$page.technologies.edges
        },
        allCategories() {
            return (!this.$page.categories || !this.$page.categories.edges) ? [] : this.$page.categories.edges
        },
    },
    created() {
        const splittedTechnologies = (this.$route.query && this.$route.query.technologies) ?  this.$route.query.technologies.split(',') : null
        const splittedCategories = (this.$route.query && this.$route.query.categories) ?  this.$route.query.categories.split(',') : null

        this.fillListFromParams(splittedTechnologies, splittedCategories)
    },
    methods: {
        fillListFromParams(splittedTechnologies, splittedCategories) {
            if (splittedTechnologies) {
                this.selectedTechnologies = this.$page.technologies.edges.filter(element => {
                    return splittedTechnologies.some(technology => {
                        return element.node.fileInfo.name.includes(technology)
                    })
                })
            }

            if (splittedCategories) {
                this.selectedCategories = this.$page.categories.edges.filter(element => {
                    return splittedCategories.some(technology => {
                        return element.node.fileInfo.name.includes(technology)
                    })
                })
            }
        },
        isElementConcerned(element) {
            let isConcerned = false
            if (this.selectedCategories) {
                isConcerned = this.selectedCategories.some(category => {
                    return element.node.categories.includes(this.itemToSlug(category))
                })
            }
            if (this.selectedTechnologies && !isConcerned) {
                isConcerned = this.selectedTechnologies.some(technology => {
                    return element.node.technologies.includes(this.itemToSlug(technology))
                })
            }
            return isConcerned
        },
        itemToSlug(item) {
            return item.node.fileInfo.name
        },
        addFilters() {
            this.selectedTechnologies = this.selectedTechnologies && this.selectedTechnologies.length > 0 ? this.selectedTechnologies : null
            this.selectedCategories = this.selectedCategories && this.selectedCategories.length > 0 ? this.selectedCategories : null

            let technologiesSlug
            let categoriesSlug
            let query

            if (this.selectedCategories && this.selectedTechnologies) {
                technologiesSlug = this.selectedTechnologies.map(this.itemToSlug).join(',')
                categoriesSlug = this.selectedCategories.map(this.itemToSlug).join(',')
                query = { technologies: technologiesSlug , categories: categoriesSlug }
            } else if (this.selectedTechnologies) {
                technologiesSlug = this.selectedTechnologies.map(this.itemToSlug).join(',')
                query = { technologies: technologiesSlug }
            } else if (this.selectedCategories) {
                categoriesSlug = this.selectedCategories.map(this.itemToSlug).join(',')
                query = { categories: categoriesSlug }
            }
            this.$router.replace({ path: 'portfolio', query })

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
