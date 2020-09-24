<template>
    <layout>
        <block v-bind="aboutContent" />
    </layout>
</template>

<script>
import Block from '~/components/Block'

export default {
    components: {
        Block,
    },
    computed: {
        aboutContent() {
            return this.$page.about.edges[0].node
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
}
</page-query>
