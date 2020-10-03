<template>
    <layout>
        <creations-list
            :technologies="allTechnologies"
            :categories="allCategories"
            :list="allCreations"
            :show-filters="true"
            title-tag="h2"
        />
    </layout>
</template>

<script>
import CreationsList from '~/components/CreationsList.vue'

export default {
    components: {
        CreationsList,
    },
    computed: {
        allCategories() {
            if (this.$page.categories && this.$page.categories.edges && this.$page.categories.edges.length > 0) {
                return this.$page.categories.edges
            }

            return null
        },
        allCreations() {
            if (this.$page.portfolioItems && this.$page.portfolioItems.edges) {
                return this.$page.portfolioItems.edges
            }

            return []
        },
        allTechnologies() {
            if (this.$page.technologies && this.$page.technologies.edges && this.$page.categories.edges.length > 0) {
                return this.$page.technologies.edges
            }

            return null
        },
    },
}
</script>

<page-query>
  query {
    portfolioItems: allPortfolioItem (sortBy: "featured")  {
      edges {
        node {
          id
          path
          title
          date(format: "DD/MM/YYYY")
          excerpt
          coverImage
          technologies
          categories
        }
      }
    }
    technologies: allTechnology {
      edges {
        node {
          id
          title
          excerpt
          coverImage
          fileInfo {
              name
          }
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
          fileInfo {
              name
          }
        }
      }
    }
  }
</page-query>
