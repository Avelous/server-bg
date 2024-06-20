import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import investmentRoutes from "./routes/investments.js";
import messageRoutes from "./routes/messages.js";
import withdrawalRoutes from "./routes/withdrawals.js";
import { register } from "./controllers/auth.js";
import { getInvestments } from "./controllers/investments.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Investment from "./models/Investment.js";
import { sendBlueEmail } from "./emailControllers/sendiInBlue.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// app.options('/', cors());

/* ROUTES WITH FILES */
app.post("/auth/register", register);
app.post("/investments", verifyToken, getInvestments);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/investments", investmentRoutes);
app.use("/messages", messageRoutes);
app.use("/withdrawals", withdrawalRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
const connectWithRetry = () => {
  console.log("connecting");
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 3000,
    })
    .then(() => {
      app.get("/", (req, res) => {
        res.send({ title: "users" });
      });
      app.listen(PORT, () => console.log(`Connected to Server Port: ${PORT}`));

      /* ADD DATA ONE TIME */
      // User.insertMany(users);
      // Post.insertMany(posts);
    })
    .catch((error) => {
      console.log(`${error} did not connect`);
      setTimeout(connectWithRetry, 3000);
    });
};

connectWithRetry();

