'use strict';

const express = require('express');
const logger = require('morgan');
const api = express();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const cors = require('cors');

// Configure cors
api.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS,
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
  optionsSuccessStatus: process.env.CORS_OPTIONS_SUCCESS_STATUS
}))

// View engine setup
api
  .set('views', 'views')
  .set('view engine', 'pug');

// Configure api
api
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ express: false }))
  .use(express.static('public'));

// Configure routes
api
  .use('/api', indexRouter)
  .use('/api', userRouter);

// Catch 404 and forward to error handler
api.use((req, res, next) => res.render('error', {
  title: 'NOT_FOUND',
  message: 'Not Found',
  error: {
    status: 404,
    stack: ''
  }
}));

// Error handler
api.use((error, req, res, next) => res.render('error', {
  title: 'INTERNAL_SERVER_ERROR',
  message: 'Internal Server Error',
  error: {
    status: 500,
    stack: error.stack
  }
}));

module.exports = api;
