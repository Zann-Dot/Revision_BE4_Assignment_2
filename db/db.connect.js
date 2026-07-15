const { default: mongoose } = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGODB;

async function initializeDatabase() {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("Database connection failed");
    });
}
module.exports = { initializeDatabase };
