<template>
    <layout>
        <creations-list :list="allCreations" />

        <technologies-list :list="allTechnologies" />

        <categories-list :list="allCategories" />
    </layout>
</template>

<script>
import CreationsList from '~/components/CreationsList.vue'
import TechnologiesList from '~/components/TechnologiesList.vue'
import CategoriesList from '~/components/CategoriesList.vue'

export default {
    components: {
        TechnologiesList,
        CreationsList,
        CategoriesList,
    },
    computed: {
        allCreations() {
            if (!this.$page.portfolioItems || !this.$page.portfolioItems.edges) {
                return []
            }

            return this.$page.portfolioItems.edges
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
}
</script>

<page-query>
  query {
    portfolioItems: allPortfolioItem (sortBy: "featured", limit: 5)  {
      edges {
        node {
          id
          path
          title
          date(format: "DD/MM/YYYY")
          excerpt
          coverImage
        }
      }
    }
    technologies: allTechnology {
      edges {
        node {
          id
          path
          title
          excerpt
          coverImage
        }
      }
    }
    categories: allCategory {
      edges {
        node {
          id
          path
          title
          excerpt
          coverImage
        }
      }
    }
  }
</page-query>
