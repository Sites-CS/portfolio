<template>
    <layout>
        <creations-list :list="allCreations" />

        <technologies-list :list="allTechnologies" />
    </layout>
</template>

<script>
import TechnologiesList from '~/components/TechnologiesList.vue'
import CreationsList from '~/components/CreationsList.vue'

export default {
    components: {
        TechnologiesList,
        CreationsList,
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
    },
}
</script>

<page-query>
  query {
    portfolioItems: allPortfolioItem {
      edges {
        node {
          id
          title
          slug
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
          title
          slug
          excerpt
          coverImage
        }
      }
    }
  }
</page-query>
