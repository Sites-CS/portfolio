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
            <g-link
                :to="`creations/${creation.node.slug}`"
                class="creations-list-item d-block my-4"
            >
                <b-card
                    no-body
                >
                    <g-image
                        class="creations-list-item-coverImage card-img"
                        :src="creation.node.coverImage"
                        alt=""
                    />

                    <b-card-body>
                        <b-card-title class="creations-list-item-title">
                            {{ creation.node.title }}
                        </b-card-title>

                        <b-card-text class="creations-list-item-date">
                            {{ creation.node.date }}
                        </b-card-text>

                        <b-card-text class="creations-list-item-excerpt">
                            {{ creation.node.excerpt }}
                        </b-card-text>
                    </b-card-body>
                </b-card>
            </g-link>
        </b-col>
    </b-row>
</template>

<script>
import {
    BCard,
    BCardBody,
    BCardTitle,
    BCardText,
    BCol,
    BRow,
} from 'bootstrap-vue'

export default {
    components: {
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
