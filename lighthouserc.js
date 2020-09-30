module.exports = {
    ci: {
        assert: {
            preset: 'lighthouse:recommended',
            assertions: {
                'unused-css-rules': ['warn', { maxLength: 0 }],
                'unused-javascript': ['warn', { maxLength: 0 }],
                'uses-text-compression': 'off',
                'without-javascript': 'off',
            },
        },
        collect: {
            url: ['https://localhost:8080/'],
            startServerCommand: 'http-server ./dist --ssl --cert cert.pem',
            startServerReadyPattern: 'listen|ready|available on',
            settings: {
                chromeFlags: ['--ignore-certificate-errors'],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
}
