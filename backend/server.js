import express from "express";
import "colors";
import morgan from "morgan";
import connectDB from './config/config.js';
import dotenv from 'dotenv';
dotenv.config();
import router from "./routes/treeRoute.js";
import  cors from 'cors'
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRouter.js";
import uploaderController from "./routes/uploaderController.js";

const app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://green-earth-chi.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(
  cors({
    origin: "*",
  })
);



app.use(express.json());
app.use(morgan('dev'));

  (async () => {
    try {
      await connectDB();
      console.log("i know mongoDB url is Public".bgRed);
    } catch (error) {
      console.error("MongoDB connection failed:", error);
    }
  })();

//routes
app.use('/api/trees', router);
app.use('/api/auth', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/user-message', contactRouter);
app.use('/api/upload', uploaderController)



const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`.bgGreen.white);
})
