<template>
    <div>
        <div>
            <technologies-filters
                v-if="technologies"
                :list="technologies"
                :selected="selectedTechnologies"
                @selected="setSelectedTechnologies"
            />

            <categories-filters
                v-if="categories"
                :list="categories"
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
import TechnologiesFilters from '~/components/TechnologiesFilters.vue'
import CategoriesFilters from '~/components/CategoriesFilters.vue'

export default {
    components: {
        BButton,
        BCard,
        BCardBody,
        BCardTitle,
        BCardText,
        BCol,
        BRow,
        TechnologiesFilters,
        CategoriesFilters,
    },
    props: {
        categories: {
            type: Array,
            default: null,
        },
        list: {
            type: Array,
            required: true,
        },
        technologies: {
            type: Array,
            default: null,
        },
        titleTag: {
            type: String,
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
    },
    created() {
        const splittedTechnologies = (this.$route.query && this.$route.query.technologies) ?  this.$route.query.technologies.split(',') : null
        const splittedCategories = (this.$route.query && this.$route.query.categories) ?  this.$route.query.categories.split(',') : null

        this.fillListFromParams(splittedTechnologies, splittedCategories)
    },
    methods: {
        fillListFromParams(splittedTechnologies, splittedCategories) {
            if (splittedTechnologies) {
                this.selectedTechnologies = this.technologies.filter(element => {
                    return splittedTechnologies.some(technology => {
                        return element.node.fileInfo.name.includes(technology)
                    })
                })
            }

            if (splittedCategories) {
                this.selectedCategories = this.categories.filter(element => {
                    return splittedCategories.some(technology => {
                        return element.node.fileInfo.name.includes(technology)
                    })
                })
            }
        },
        isElementConcerned(element) {
            let isConcerned = true
            if (this.selectedCategories) {
                isConcerned = isConcerned && this.selectedCategories.some(category => {
                    return element.node.categories.includes(this.itemToSlug(category))
                })
            }
            if (this.selectedTechnologies) {
                isConcerned = isConcerned && this.selectedTechnologies.some(technology => {
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

            let query

            if (this.selectedCategories && this.selectedTechnologies) {
                query = {
                    technologies: this.selectedTechnologies.map(this.itemToSlug).join(','),
                    categories: this.selectedCategories.map(this.itemToSlug).join(','),
                }
            } else if (this.selectedTechnologies) {
                query = {
                    technologies: this.selectedTechnologies.map(this.itemToSlug).join(',')
                }
            } else if (this.selectedCategories) {
                query = {
                    categories: this.selectedCategories.map(this.itemToSlug).join(',')
                }
            }

            this.$router.replace({ query })
                // Make "NavigationDuplicated: Avoided redundant navigation to current location" errors silent
                .catch(() => {})
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
