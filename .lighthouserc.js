module.exports = {
    ci: {
        assert: {
            preset: "lighthouse:all",
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
