const express = require('express');

/**
 * Build a mock Express response object that records status codes and payloads.
 */
const mockRes = () => {
  const res = {};
  res.statusCode = 200;
  res.body = undefined;
  res.status = jest.fn((code) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn((payload) => {
    res.body = payload;
    return res;
  });
  return res;
};

/**
 * Build a mock Express request object.
 */
const mockReq = (overrides = {}) => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  ...overrides,
});

/**
 * Build a minimal Express app mounting a single router, for supertest.
 */
const buildApp = (mountPath, router) => {
  const app = express();
  app.use(express.json());
  app.use(mountPath, router);
  return app;
};

module.exports = { mockRes, mockReq, buildApp };
