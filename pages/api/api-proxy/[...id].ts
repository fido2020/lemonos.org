import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiHandler } from "next";
import { agent } from "../../../agent";

const req = (req, res) => {
    console.log(req);
    res.json('hi')
    // return (req, res);
}

export default createProxyMiddleware({
    target: 'https://api.lemonos.org', agent, headers: {
        host: 'lemonos.org'
    }
});