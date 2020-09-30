<template>
    <layout>
        <creations-list :list="allCreations" />
    </layout>
</template>

<script>
import CreationsList from '~/components/CreationsList.vue'

export default {
    components: {
        CreationsList,
    },
    computed: {
        allCreations() {
            if (!this.$page.portfolioItems || !this.$page.portfolioItems.edges) {
                return []
            }

            return this.$page.portfolioItems.edges
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
          technologies
          categories
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
