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
            <b-card
                no-body
                class="technologies-list-item-card my-4"
            >
                <g-image
                    class="technologies-list-item-coverImage card-img"
                    :src="tech.node.coverImage"
                    alt=""
                />

                <b-card-body>
                    <b-card-title
                        tag="h3"
                        class="technologies-list-item-title h5"
                    >
                        {{ tech.node.title }}
                    </b-card-title>

                    <b-button
                        :to="tech.node.path"
                        class="technologies-list-item"
                        block
                        variant="primary"
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
        list: {
            type: Array,
            required: true,
        },
    },
}
</script>
