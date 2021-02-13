module.exports = {
    locales: ['en-AU'],
    defaultLocale: 'en-AU',
    async rewrites() {
        return [
            { source: '/wp-:n', destination: '/api/api-proxy/wp-:n' },
            { source: '/wp-:n/:id*', destination: '/api/api-proxy/wp-:n/:id*' },
            { source: '/wp/:id*', destination: '/api/api-proxy/wp/:id*' },
        ]
    },
    async headers() {
        return [{
            source: '/wp-content/:path*',
            headers: [{
                key: 'cache-control',
                value: 'public, max-age=604800, immutable'
            }, {
                key: 'content-security-policy',
                value: "default-src 'none'"
            }]
        }]
    }
}