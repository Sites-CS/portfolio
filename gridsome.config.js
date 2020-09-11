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
                path.resolve(__dirname, './src/assets/scss/_vars.scss'),
                path.resolve(__dirname, './src/assets/scss/_mixins.scss'),
            ],
        })
}

module.exports = {
    siteName: 'Portfolio',
    siteUrl: 'https://www.portfolio-app.com',
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
                typeName: 'Post',
                baseDir: './posts',
                path: '*.md',
            },
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Categories',
                baseDir: './categories',
                path: '*.md',
            },
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Technologies',
                baseDir: './technologies',
                path: '*.md',
            },
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Blocs',
                baseDir: './blocs',
                path: '*.md',
            },
        },
        {
            use: `gridsome-plugin-netlify-cms`,
            options: {
                publicPath: `/admin`,
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
