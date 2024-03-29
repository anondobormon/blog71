//Requiring external library
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

//Internal Imports
const connectDatabase = require("./database/database");
const errorMiddleware = require("./middleware/errorMiddleware");

//Routing Imports
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");

// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

//configuration
// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
// app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server dut to Uncaught Exception`);
  process.exit(1);
});

//Dotenv config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Cloudinary
cloudinary.config({
  cloud_name: process.env.COLUDINARY_NAME,
  api_key: process.env.COLUDINARY_API_KEY,
  api_secret: process.env.COLUDINARY_API_SECRET,
});

//Routes
app.use("/api/blog", userRouter);
app.use("/api/blog", blogRouter);

//Connect Database
connectDatabase();

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Error Handling Middleware
app.use(errorMiddleware);

//Connect server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});

//Unhandled promise rejection errors
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
