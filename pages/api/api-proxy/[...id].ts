import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiHandler } from "next";


export default createProxyMiddleware({
    target: 'https://api.lemonos.org',
    autoRewrite: false,
    toProxy: true,
    headers: {host:'www.lemonos.org'},
    protocolRewrite: 'https',
    followRedirects: false,
});