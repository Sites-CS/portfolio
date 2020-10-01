<template>
    <generic-filters
        :list="list"
        list-name="technologies"
        label-name="Technologies"
        :selected="selected"
        @selected="setSelected"
    />
</template>

<script>
import GenericFilters from '~/components/GenericFilters.vue'

export default {
    components: {
        GenericFilters,
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
