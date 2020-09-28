<template>
    <generic-list
        :list="list"
        list-name="categories"
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
    },
}
</script>
