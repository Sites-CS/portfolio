<template>
    <div>
        <g-link
            v-for="(tech, index) in list"
            :key="`technologies-list-item-${index}`"
            :to="`technologies/${tech.node.slug}`"
            class="about-technologie-item"
        >
            <g-image
                class="technologies-list-item-coverImage"
                :src="tech.node.coverImage"
                alt=""
            />
            <h2 class="technologies-list-item-title">
                {{ tech.node.title }}
            </h2>
        </g-link>
    </div>
</template>

<script>

export default {
    props: {
        list: {
            type: Array,
            default: [],
        },
    },
}
</script>
