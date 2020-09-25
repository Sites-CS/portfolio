<template>
    <layout>
        <g-image
            class="creations-list-item-coverImage"
            :src="$page.entry.coverImage"
            :alt="$t('portfolio.coverImageAlt', { title: $page.entry.title })"
        />

        <h1 class="portfolio-item-title">
            {{ $page.entry.title }}
        </h1>

        <p class="portfolio-item-excerpt">
            {{ $page.entry.excerpt }}
        </p>

        <p>
            <b-button
                class="portfolio-item-link"
                :href="$page.entry.link"
                target="_blank"
                rel="noopener"
            >
                {{ $t('portfolio.visitWebsite') }}
            </b-button>
        </p>

        <div
            class="portfolio-item-content"
            v-html="$page.entry.content"
        />
    </layout>
</template>

<script>
import {
    BButton,
} from 'bootstrap-vue'

export default {
    components: {
        BButton,
    },
}
</script>

<page-query>
  query PortfolioItem($id: ID!) {
    entry: portfolioItem(id: $id) {
      title
      excerpt
      link
      coverImage
      content
    }
  }
</page-query>
