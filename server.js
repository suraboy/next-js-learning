const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
require('dotenv').config({
    path: '.env'
})
const port = parseInt(process.env.PORT, 10) || 3000
const dev = (process.env.APP_ENV == 'local') ? true : false
const app = next({ dev })
const handle = app.getRequestHandler()
const dns = require('dns');

const loggerService = require('./src/services/graylog.service')

app.prepare().then(() => {
    const server = express()

    //Body-Parser
    server.use(bodyParser.json({ limit: "50mb", extended: true }));

    //Call graylog
    server.post('/sendlog', (req, res, next) => {
        const clientIp = getAPIIp();
        const executeTime = new Date() - new Date(req.body.startReqTime)
        const request = req.body.request
        const response = req.body.response
        const requestGraylog = {
            ...request,
            headers: req.headers
        }
        try {
            loggerService.sendLog(requestGraylog, response, executeTime, clientIp)

            res.status(200).json({ statusCode: 200, message: "SUCCESS" });
        } catch (err) {
            res.status(200).json({ statusCode: 500, message: "SOMETHING_WENT_WRONG"});
        }
    })

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})

function getAPIIp() {
    let url = process.env.API_URL;
    url = url.replace("/api/v1", "");
    url = url.replace("https://", "");
    url = url.replace("http://", "");
    url = url.replace(":3001", "");
    if (url === "localhost") {
        return "127.0.0.1"
    } else {
        return dns.lookup(url, (err, address) => {
            return address
        });
    }
}
