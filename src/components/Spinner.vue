<template>
    <b-spinner
        class="spinner"
        v-bind="$attrs"
    />
</template>

<script>
import {
    BSpinner,
} from 'bootstrap-vue'

export default {
    components: {
        BSpinner,
    },
}
</script>

<style lang="scss">
.spinner {
    .btn & {
        &:not(:first-child) {
            margin-left: .25rem;
        }

        &:not(:last-child) {
            margin-right: .25rem;
        }
    }
}
</style>
