const path = require("path");

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
  quiet: true,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = { supabase };
