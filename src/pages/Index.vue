<template>
    <layout>
        <!-- Learn how to use images here: https://gridsome.org/docs/images -->
        <g-image
            alt="Example image"
            src="~/favicon.png"
            width="135"
        />

        <h1>Hello, world!</h1>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
        </p>

        <b-nav class="home-links">
            <b-nav-item
                href="https://gridsome.org/docs/"
                target="_blank"
                rel="noopener"
            >
                Gridsome Docs
            </b-nav-item>
            <b-nav-item
                href="https://github.com/gridsome/gridsome"
                target="_blank"
                rel="noopener"
            >
                GitHub
            </b-nav-item>
        </b-nav>
    </layout>
</template>

<script>
import {
    BNav,
    BNavItem,
} from 'bootstrap-vue'

export default {
    components: {
        BNav,
        BNavItem,
    },
    metaInfo: {
        title: 'Hello, world!',
    },
}
</script>
