<template>
    <div>
        <g-link
            v-for="(creation, index) in list"
            :key="`creations-list-item-${index}`"
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
    </div>
</template>

<script>
import {
    BCard,
    BCardBody,
    BCardTitle,
    BCardText,
} from 'bootstrap-vue'

export default {
    components: {
        BCard,
        BCardBody,
        BCardTitle,
        BCardText,
    },
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
}
</script>
