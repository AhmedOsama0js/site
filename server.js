const express = require("express");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/AppError");
const usersRoute = require("./routes/usersRoutes");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

app.use("/api", usersRoute);

app.use(express.static(path.join(__dirname, "public", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "build/index.html"));
});

// 400 error
app.use((req, res, next) => {
  next(new AppError(`Can't find this route ${req.originalUrl}`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
