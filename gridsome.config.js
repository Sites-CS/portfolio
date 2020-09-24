// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// TODO: Use critical CSS plugin
// @see https://gridsome.org/plugins/@gridsome/plugin-critical

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

module.exports = {
    // TODO: Use env?
    siteName: 'Portfolio',
    // TODO: Use env
    siteUrl: 'https://example.com',
    // icon: {
    //     favicon: 'src/favicon.png',
    // },
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
                typeName: 'Categorie',
                baseDir: './content/categories',
                path: '*.md',
            },
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Technologie',
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
        },
    ],
    chainWebpack(config) {
        // Load variables for all vue-files
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

        types.forEach(type => {
            addStyleResource(config.module.rule('scss').oneOf(type))
        })
    },
}
