module.exports = {
    extends: [
        'plugin:vue/recommended',
    ],
    rules: {
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'no-unused-vars': 'error',
        'quote-props': ['error', 'as-needed'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'space-before-function-paren': ['error', 'never'],
        'vue/component-name-in-template-casing': ['error', 'kebab-case', {
            registeredComponentsOnly: false,
        }],
        'vue/html-indent': ['error', 4],
    },
}
