const app = require("./app.js");
const ejs=require("ejs");
const dotenv = require("dotenv");

const { connectDB } = require("./config/database.js");
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


dotenv.config({ path: "config/config.env" });

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `server is running port on:-> ${process.env.PORT||"3000"} `
  );
});

// console.log(youtube);