<template>
    <b-row
        cols="1"
        cols-md="2"
        cols-xl="3"
    >
        <b-col
            v-for="(creation, index) in list"
            :key="`creations-list-item-${index}`"
        >
            <b-card
                class="my-4"
                no-body
            >
                <g-image
                    class="creations-list-item-coverImage card-img"
                    :src="creation.node.coverImage"
                    alt=""
                />

                <b-card-body>
                    <b-card-title
                        tag="h3"
                        class="creations-list-item-title h4"
                    >
                        {{ creation.node.title }}
                    </b-card-title>

                    <b-card-text class="creations-list-item-date">
                        {{ creation.node.date }}
                    </b-card-text>

                    <b-card-text class="creations-list-item-excerpt">
                        {{ creation.node.excerpt }}
                    </b-card-text>

                    <b-button
                        :to="creation.node.path"
                        class="creations-list-item"
                        block
                        variant="primary"
                    >
                        {{ $t('portfolio.viewItem') }}
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
    BCardText,
    BCol,
    BRow,
} from 'bootstrap-vue'

export default {
    components: {
        BButton,
        BCard,
        BCardBody,
        BCardTitle,
        BCardText,
        BCol,
        BRow,
    },
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
}
</script>
