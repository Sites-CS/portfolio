<template>
    <generic-list
        :list="list"
        list-name="categories"
        :selected="selected"
        @selected="setSelected"
    />
</template>

<script>
import GenericList from '~/components/GenericList.vue'

export default {
    components: {
        GenericList,
    },
    props: {
        list: {
            type: Array,
            required: true,
        },
        selected: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        setSelected(selected) {
            this.$emit('selected', selected)
        },
    },
}
</script>
