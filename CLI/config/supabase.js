const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;

/*
---------------------------------------------------------
Supabase Configuration
---------------------------------------------------------
This file initializes the Supabase client using the
project URL and secret key stored in the .env file.
The configured client is exported so it can be used
throughout the application for Storage operations.
---------------------------------------------------------
*/
