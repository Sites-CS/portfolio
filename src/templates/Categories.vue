<template>
    <layout>
        <p class="post-entry-title">
            {{ $page.entry.title }}
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
      coverImage
    }
  }
</page-query>

<style lang="scss">
</style>
