module.exports = {
    ci: {
        assert: {
            preset: 'lighthouse:recommended',
        },
        collect: {
            url: ['https://localhost:8080/'],
            startServerCommand: 'npx http-server ./dist --ssl --cert cert.pem',
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
}
