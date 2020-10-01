<template>
    <layout>
        <block v-bind="aboutContent" />

        <creations-list :list="allCreations" />
    </layout>
</template>

<script>
import Block from '~/components/Block'
import CreationsList from '~/components/CreationsList.vue'

export default {
    components: {
        Block,
        CreationsList,
    },
    computed: {
        aboutContent() {
            return this.$page.about.edges[0].node
        },
        allCreations() {
            return (!this.$page.portfolioItems || !this.$page.portfolioItems.edges) ? [] : this.$page.portfolioItems.edges
        },
    },
}
</script>

<page-query>
{
    about: allBlock(filter: { uuid: { eq: "about" } }) {
        edges {
            node {
                title
                content
            }
        }
    }
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
}
</page-query>
