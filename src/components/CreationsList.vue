<template>
    <div>
        <g-link
            v-for="(creation, index) in list"
            :key="`creations-list-item-${index}`"
            :to="`creations/${creation.node.slug}`"
            class="creations-list-item"
        >
            <g-image
                class="creations-list-item-coverImage"
                :src="creation.node.coverImage"
                alt=""
            />
            <h2 class="creations-list-item-title">
                {{ creation.node.title }}
            </h2>
            <p class="creations-list-item-date">
                {{ creation.node.date }}
            </p>
            <p class="creations-list-item-excerpt">
                {{ creation.node.excerpt }}
            </p>
        </g-link>
    </div>
</template>

<script>

export default {
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
}
</script>
