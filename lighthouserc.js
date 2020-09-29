module.exports = {
    ci: {
        assert: {
            preset: 'lighthouse:recommended',
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
