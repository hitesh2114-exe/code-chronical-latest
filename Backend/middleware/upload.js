const multer = require("multer");

// Store uploaded files temporarily in memory
const storage = multer.memoryStorage();

// Configure multer
const upload = multer({
  storage,
});

module.exports = {upload};