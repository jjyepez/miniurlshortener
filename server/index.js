const express = require('express');
const http = require('http');
const app = express();

require('morgan')('dev');

const port = process.env.EXPRESS_PORT || 8010;

app.use(express.json());

app
    .get('/', (req, res, next) => {
        res.send('Hello');
    })

    .use('/!', require('./routes/urlShortenerRoute.js'))

const server = http.createServer(app)
server.address = 'jj.co.ve';
server.listen(port, () => {
    console.log({ server })
})