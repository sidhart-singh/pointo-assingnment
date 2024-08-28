const express = require("express");
const db = require("./config/database");
const notesRouter = require("./routes/notes");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// Setting up routes
app.use("/notes", notesRouter);

// Connecting to database
try {
  db.sequelize.sync();
} catch (err) {
  console.error("Couldn't connect to db", err);
}

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
