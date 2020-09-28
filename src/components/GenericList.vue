<template>
    <b-row
        cols="1"
        cols-sm="2"
        cols-md="3"
        cols-lg="4"
        cols-xl="6"
        :class="`${listName}-list`"
    >
        <b-col
            v-for="(tech, index) in list"
            :key="`${listName}-list-item-${index}`"
            :class="`${listName}-list-item`"
        >
            <b-card
                no-body
                :class="`${listName}-list-item-card my-4`"
            >
                <g-image
                    :class="`${listName}-list-item-coverImage card-img`"
                    :src="tech.node.coverImage"
                    alt=""
                />

                <b-card-body>
                    <b-card-title
                        tag="h3"
                        :class="`${listName}-list-item-title h5`"
                    >
                        {{ tech.node.title }}
                    </b-card-title>

                    <b-button
                        :to="tech.node.path"
                        :class="`${listName}-list-item-link`"
                        block
                        variant="primary"
                        router-component-name="g-link"
                    >
                        {{ $t('portfolio.viewProjects') }}
                    </b-button>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import {
    BButton,
    BCard,
    BCardBody,
    BCardTitle,
    BCol,
    BRow,
} from 'bootstrap-vue'

export default {
    components: {
        BButton,
        BCard,
        BCardBody,
        BCardTitle,
        BCol,
        BRow,
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
    },
}
</script>
