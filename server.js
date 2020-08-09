const http = require('http')
const url = require('url')
const port = process.argv[2]

if (!port) {
    console.log('请指定端口')
    process.exit(1)
}

const server = http.createServer((request, response) => {
    let parsedUrl = url.parse(request.url, true)
    let pathWithQuery = request.url
    let queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    let path = parsedUrl.pathname
    let query = parsedUrl.query
    let method = request.method
    console.log(pathWithQuery)
    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`
            <!DOCTYPE html>
            <head>
                <link rel="stylesheet" href="/x">
            </head>
            <body>
                Hi
            </body>
        `)
        response.end()
    } else if (path === '/x') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write('body{color: red; font-size: 100px;};')
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write('404')
        response.end()
    } 
})

server.listen(port)
console.log(`监听${port}成功, 请访问 http://localhost:${port}`)