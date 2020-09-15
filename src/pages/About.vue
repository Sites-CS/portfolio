<template>
    <Layout>
        <h1>About me</h1>
        <div>
            <g-image
                ref="picture"
                :src="picture"
                alt=""
                class="about-card-picture"
            />
        </div>

        <div class="about-name">
            <p class="text-bold">
                {{ firstname }} {{ lastname }}
            </p>
        </div>

        <div class="about-excerpt">
            <p>{{ excerpt }}</p>
        </div>

        <technologies-list />

        <li
            v-for="(post, index) in allCreations"
            :key="`about-creations-${index}`"
            class="about-creations-item"
        >
            <h2 class="about-creations-item-title">
                {{ post.node.title }}
            </h2>
        </li>
    </Layout>
</template>

<script>
import picture from '~/assets/img/picture.jpg'
// TODO: How to import dynamically theses logos ?
import nodejs from '~/assets/img/nodejs_logo.png'
import vuejs from '~/assets/img/vuejs_logo.png'
import TechnologiesList from '~/components/TechnologiesList.vue'

export default {
    components: {
        TechnologiesList,
    },
    data() {
        return {
            picture: picture,
            firstname: 'Cédric',
            lastname: 'BRASSEUR',
            excerpt: 'Ancien développeur .Net et auto-entrepreneur depuis début 2020, je suis un développeur backend dans l\'âme. En partenariat avec Sébastien JEAN, expert en technologies webs, spécialisé dans le frontend et auto-entrepreneur depuis 2012. Nous enchaînons les collaborations, ce qui me permet de me spécialiser dans le Web au côté d\'un cador dans le domaine. Mon expérience en tant que chef de projet et développeur lors de mes années chez Euro Info Developpement nous rend complémentaire. Nous sommes prêt à relever n\'importe quel défi technique. Je suis également intervenant/formateur sur des sujets relatif à la modélisation objet (UML, Desing pattern, ...), les bases de données (Merise, SQL, T-SQL,...), ou techniquement sur du langage .Net essentiellement. J\'étudierai toute proposition d\'intervention, j\'apprécie partager mes connaissances et faire collaborer des étudiants pour leur apprendre les bons reflexes à avoir en tant que futurs développeurs.',
            // TODO : Replace technologies by technologies contained in creations lists
            // don't forget to handle logo and link
            technologies: [
                {
                    link: '/TechnologieFiltered/nodejs',
                    text: 'NodeJS',
                    picture: nodejs,
                },
                {
                    link: '/TechnologieFiltered/vuejs',
                    text: 'VueJS',
                    picture: vuejs,
                },
            ],
            // list of creations
        }
    },
    computed: {
        allCreations() {
            if (!this.$page.posts || !this.$page.posts.edges) {
                return []
            }

            return this.$page.posts.edges
        },
    },
    metaInfo: {
        title: 'About us',
    },
}
</script>

<page-query>
  query {
    posts: allPost {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage
        }
      }
    }
    technologies: allTechnologies {
      edges {
        node {
          id
          title
          excerpt
          coverImage
        }
      }
    }
  }
</page-query>

<style lang="scss">
.about-name .text-bold {
    font-weight: bold;
    color: $color-primary;
}

.about-technologie-item-picture {
    width: 50px;
    height: 50px;
}
</style>
