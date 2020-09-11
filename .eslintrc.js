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
        semi: ['error', 'never'],
        'space-before-function-paren': ['error', 'never'],
        'vue/html-indent': ['error', 4],
    },
}
