<template>
    <b-form-group
        :label="labelName"
    >
        <b-form-checkbox-group
            :checked="selected"
            :options="options"
            :class="`${listName}-list`"
            @input="emitSelected"
        />
    </b-form-group>
</template>

<script>
import {
    BFormGroup,
    BFormCheckboxGroup,
} from 'bootstrap-vue'

export default {
    components: {
        BFormGroup,
        BFormCheckboxGroup,
    },
    props: {
        listName: {
            type: String,
            required: true,
        },
        list: {
            type: Array,
            required: true,
        },
        selected: {
            type: Array,
            default: () => [],
        },
        labelName: {
            type: String,
            required: true,
        },
    },
    computed: {
        options() {
            return this.list.map(element => {
                return { text: element.node.title, value: element }
            })
        },
    },
    methods: {
        emitSelected(selected) {
            this.$emit('selected', selected)
        },
    },
}
</script>
