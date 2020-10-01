<template>
    <layout>
        <creations-list
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
    data() {
        return {
            isFiltered: Boolean,
            default: false,
        }
    },
    computed: {
        allCreations() {
            return (!this.$page.portfolioItems || !this.$page.portfolioItems.edges) ? [] : this.$page.portfolioItems.edges
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
