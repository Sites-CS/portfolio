<template>
    <div class="layout">
        <header class="header">
            <b-navbar toggleable="lg">
                <b-navbar-brand to="/">
                    {{ $static.metadata.siteName }}
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse" />

                <b-collapse
                    id="nav-collapse"
                    is-nav
                >
                    <b-navbar-nav>
                        <b-nav-item
                            v-for="(link, index) in links"
                            :key="`navbar-link-${index}`"
                            :to="`/${link === 'index' ? '' : link}`"
                        >
                            {{ $t(`pages.${link}`) }}
                        </b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </header>

        <b-container>
            <slot />
        </b-container>
    </div>
</template>

<script>
import {
    BCollapse,
    BContainer,
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BNavItem,
} from 'bootstrap-vue'

export default {
    components: {
        BCollapse,
        BContainer,
        BNavbar,
        BNavbarNav,
        BNavbarBrand,
        BNavbarToggle,
        BNavItem,
    },
    data() {
        return {
            links: [
                'index',
                'portfolio',
                'contact',
            ],
        }
    },
}
</script>

<static-query>
query {
    metadata {
        siteName
    }
}
</static-query>
