const api = require("./api");

async function login(email, password) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  login,
};
