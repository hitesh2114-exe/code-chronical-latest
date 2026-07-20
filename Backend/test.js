const supabase = require("./config/supabase");

const testConnection = async () => {
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("Connection Failed:", error.message);
    return;
  }

  console.log("Connected Successfully!");
  console.log(data);
};

testConnection();

/*
---------------------------------------------------------
Supabase Connection Test
---------------------------------------------------------
This file verifies that the backend is successfully
connected to Supabase by fetching the list of storage
buckets. It helps ensure that the configuration and
credentials are working correctly.
---------------------------------------------------------
*/