module.exports = {
    locales: ['en-AU'],
    defaultLocale: 'en-AU',
    async rewrites() {
        return [
            { source: '/wp-content', destination: '/api/api-proxy/wp-content'},
            { source: '/wp-admin/:id*', destination: '/api/api-proxy/wp-admin/:id*'},
            { source: '/wp-content', destination: '/api/api-proxy/wp-content'},
            { source: '/wp-admin/:id*', destination: '/api/api-proxy/wp-admin/:id*'},
        ]
    }
}