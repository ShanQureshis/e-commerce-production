import express from "express";

import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import Stripe from "stripe";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";


dotenv.config();

//database connection
connectDB();
//cloudinary Config

//stripe configuration
export const stripe = new Stripe(process.env.STRIPE_API_SECRETE_KEY);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();

//middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//route
import router from "./route/route.js";
import userRouter from "./route/userRouter.js";
import productRouter from "./route/productRouter.js";
import categoryRouter from "./route/categoryRouter.js"
import orderRouter from "./route/orderRouter.js"

app.use("/api/v1", router);
app.use("/api/v2/user", userRouter);
app.use("/api/v2/products", productRouter);
app.use("/api/v2/category", categoryRouter);
app.use("/api/v2/order", orderRouter);

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome To My Node server </h1>");
});

//port
const PORT = process.env.PORT || 8080;

//listen
  app.listen(PORT, () => {
    console.log(`Server Running On PORT ${process.env.PORT}`.bgMagenta.white);
  });
