/* eslint-env node */
'use strict';

module.exports = function(app) {
  const express = require('express');
  let authRouter = express.Router();

  authRouter.post('/', function(req, res) {
    res
      .status(200)
      .json({
        "access_token": "here-is-the-access-token",
        "token_type": "bearer",
        "expires_in": 3600,
        "refresh_token": "here-is-the-refresh-token"
      })
      .end();
  });

  app.use('/api/auth', authRouter);
};
