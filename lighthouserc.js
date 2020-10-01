module.exports = {
    ci: {
        assert: {
            preset: 'lighthouse:recommended',
            assertions: {
                'unused-css-rules': ['warn', { maxLength: 0 }],
                'unused-javascript': ['warn', { maxLength: 0 }],
                'without-javascript': 'off',
                'unsized-images': 'off',
                'color-contrast': ['warn', { minScore: 0.9 }],
            },
        },
        collect: {
            url: ['https://localhost:5000/'],
            startServerCommand: 'serve dist --ssl-cert cert.pem --ssl-key key.pem',
            startServerReadyPattern: 'listen|ready|serving!',
            settings: {
                chromeFlags: ['--ignore-certificate-errors'],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
}
