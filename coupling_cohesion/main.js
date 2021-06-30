const http = require('http')

const logger = require('./logger.js')
const delay = require('./delay.js')
const timeout = require('./timeout.js')

const routing = {
    '/': async (client, send) => {
        send('Hello World')
    },
    '/page1': async (client, send) => {
        await delay(5000)
        send('Hello World')
    }
}

http.createServer(async (req, res) => {
    const { url, method, headers } = req
    const requestTime = Date.now()
    
    res.on('close', () => {
        const time = Date.now() - requestTime
        logger(method, url, headers.referer, time)
    })

    const send = res.end.bind(res)
    const handler = routing[url]
    if (!handler) return send('Not found');
    await Promise.race([handler.bind(null, null, send), timeout(1000)])
}).listen(8888)