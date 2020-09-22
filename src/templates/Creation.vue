<template>
    <layout>
        <p class="post-entry-title">
            {{ $page.entry.title }}
        </p>
        <p class="post-entry-link">
            {{ $page.entry.link }}
        </p>
    </layout>
</template>

<script>


export default {
    components: {
    },

    computed: {

    },
}
</script>

<page-query>
  query PortfolioItem($recordId: ID!) {
    entry: portfolioItem(id: $recordId) {
      title
      excerpt
      date(format: "DD/MM/YYYY")
      link
      coverImage
    }
  }
</page-query>
