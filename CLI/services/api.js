const axios = require("axios");
const config = require("../config/config");

const api = axios.create({
  baseURL: config.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = api;
