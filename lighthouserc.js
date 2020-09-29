module.exports = {
    ci: {
        assert: {
            preset: 'lighthouse:recommended',
        },
        collect: {
            url: ['http://localhost:5000/'],
            startServerCommand: 'npx serve dist',
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
}
