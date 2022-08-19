const http = require('http');
const express = require('express');

const { globalRouter, pinRouter, commentRouter } = require('./layers/_.router.loader');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', globalRouter);
app.use('/api/pin', pinRouter);
app.use('/api/comment', commentRouter);

console.log('Server is running 3000');

http.createServer(app).listen(3000, '127.0.0.1');

/**
 * References
 *
 * Eccosystem File - https://pm2.keymetrics.io/docs/usage/application-declaration/
 *
 */
