<template>
    <section class="block">
        <component
            :is="titleTag"
            class="block-title"
        >
            {{ title }}
        </component>

        <div
            class="block-content"
            v-html="content"
        />
    </section>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        titleTag: {
            type: String,
            default: 'h1',
        },
    },
}
</script>
