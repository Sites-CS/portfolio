<template>
    <div class="technologies-list">
        <g-link
            v-for="(tech, index) in list"
            :key="`technologies-list-item-${index}`"
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
    </div>
</template>

<script>
import {
    BCard,
    BCardBody,
    BCardTitle,
} from 'bootstrap-vue'

export default {
    components: {
        BCard,
        BCardBody,
        BCardTitle,
    },
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
}
</script>
