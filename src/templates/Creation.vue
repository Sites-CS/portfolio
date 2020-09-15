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
  query Post($recordId: ID!) {
    entry: post(id: $recordId) {
      title
      excerpt
      date(format: "DD/MM/YYYY")
      link
      coverImage
    }
  }
</page-query>
