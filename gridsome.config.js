// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/scss/_vars-override.scss'),
                path.resolve(__dirname, './src/assets/scss/_vars.scss'),
                path.resolve(__dirname, './src/assets/scss/_mixins.scss'),
                path.resolve(__dirname, './node_modules/bootstrap/scss/_functions.scss'),
                path.resolve(__dirname, './node_modules/bootstrap/scss/_variables.scss'),
                path.resolve(__dirname, './node_modules/bootstrap/scss/_mixins.scss'),
            ],
        })
}

// TODO: Use env?
const siteName = 'Portfolio'
const siteDescription = 'Un exemple de portfolio réalisé avec Gridsome.'
const favicon = 'src/assets/img/favicon.png'

module.exports = {
    siteName,
    siteDescription,
    // TODO: Use env
    siteUrl: 'https://example.com',
    icon: {
        favicon,
    },

    transformers: {
        remark: {
            externalLinksTarget: '_blank',
            externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
            anchorClassName: 'icon icon-link',
            plugins: [
                // ...global plugins
            ],
        },
    },

    plugins: [
        {
            use: 'gridsome-plugin-pwa',
            options: {
                title: siteName,
                description: siteDescription,
                themeColor: '#00835c',
                backgroundColor: '#ffffff',
                icon: favicon,
                lang: 'fr',
                maskableIcon: true,
            },
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'PortfolioItem',
                baseDir: './content/portfolio-items',
                path: '*.md',
            },
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Category',
                baseDir: './content/categories',
                path: '*.md',
            },
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Technology',
                baseDir: './content/technologies',
                path: '*.md',
            },
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Block',
                baseDir: './content/blocks',
                path: '*.md',
            },
        },
        {
            use: 'gridsome-plugin-netlify-cms',
            options: {
                configPath: 'src/admin/config.yml',
                htmlTitle: 'Portfolio CMS',
                modulePath: 'src/admin/index.js',
                publicPath: '/admin',
            },
        },
        {
            use: 'gridsome-plugin-i18n',
            options: {
                locales: [
                    'fr',
                ],
                defaultLocale: 'fr',
                fallbackLocale: 'fr',
                rewriteDefaultLanguage: false,
                messages: {
                    // Messages are declared in main.js
                    // See https://github.com/daaru00/gridsome-plugin-i18n#hot-reload
                },
            },
        },
        {
            use: '@gridsome/plugin-critical',
            options: {
                paths: ['/'],
                width: 1920,
                height: 1080,
            },
        },
        {
            use: 'gridsome-plugin-netlify-cms-paths',
            options: {
                contentTypes: ['PortfolioItem', 'Technology', 'Category'],
                coverField: 'coverImage',
            },
        },
    ],

    templates: {
        PortfolioItem: [
            {
                path: '/portfolio/:title',
                component: './src/templates/PortfolioItem.vue',
            },
        ],
    },

    chainWebpack(config) {
        // Load variables for all vue-files
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

        types.forEach(type => {
            addStyleResource(config.module.rule('scss').oneOf(type))
        })
    },
}
