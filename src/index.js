const http = require('http');
const cors = require('cors');
const express = require('express');

const { pinRouter, commentRouter, authRouter } = require('./layers/_.router.loader');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);
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
