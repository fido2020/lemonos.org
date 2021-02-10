const req = (req, res) => {
    console.log(req);
    res.json('hi')
    // return createProxyMiddleware({
    //     target: 'https://api.lemonos.org', agent, headers: {
    //         host: 'lemonos.org'
    //     }
    // })(req, res);
}

export default req;