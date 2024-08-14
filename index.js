const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./src/routers/authRouter");
const labelRouter = require("./src/routers/labelRouter");
const categoryRouter = require("./src/routers/categoryRouter");
const userRouter = require("./src/routers/userRouter");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Beckend is running well",
  });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/labels", labelRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
