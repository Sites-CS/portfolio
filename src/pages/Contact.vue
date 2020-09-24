<template>
    <layout>
        <block v-bind="introContent" />

        <contact-form />
    </layout>
</template>

<script>
import Block from '~/components/Block'
import ContactForm from '~/components/ContactForm'

export default {
    components: {
        Block,
        ContactForm,
    },
    computed: {
        introContent() {
            return this.$page.intro.edges[0].node
        },
    },
}
</script>

<page-query>
{
    intro: allBlock(filter: { uuid: { eq: "contact-intro" } }) {
        edges {
            node {
                title
                content
            }
        }
    }
}
</page-query>
