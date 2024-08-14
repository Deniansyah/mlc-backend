const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// URL koneksi dari variabel lingkungan
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectionString
});

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = client;
