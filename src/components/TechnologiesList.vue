<template>
    <b-row
        cols="1"
        cols-sm="2"
        cols-md="3"
        cols-lg="4"
        cols-xl="6"
    >
        <b-col
            v-for="(tech, index) in list"
            :key="`technologies-list-item-${index}`"
            class="technologies-list"
        >
            <g-link

                :to="`technologies/${tech.node.slug}`"
                class="technologies-list-item d-block my-4"
            >
                <b-card
                    no-body
                >
                    <g-image
                        class="technologies-list-item-coverImage card-img"
                        :src="tech.node.coverImage"
                        alt=""
                    />

                    <b-card-body>
                        <b-card-title class="technologies-list-item-title">
                            {{ tech.node.title }}
                        </b-card-title>
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
    BCol,
    BRow,
} from 'bootstrap-vue'

export default {
    components: {
        BCard,
        BCardBody,
        BCardTitle,
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
