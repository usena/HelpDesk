import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from './utils/swagger.js';
import connectDB from './utils/mongodb.js';

import ticketRoute from "./routes/ticketRoute.js";
import userRoute from "./routes/userRoute.js";
import faqRoutes from "./routes/faqRoutes.js";

const app = express();
dotenv.config();

const LOCAL_SERVER_FRONTEND = process.env.LOCAL_SERVER_FRONTEND;
const DEPLOY_SERVER_FRONTEND = process.env.DEPLOY_SERVER_FRONTEND;

app.use(express.json());
app.use(cors({
    origin: [LOCAL_SERVER_FRONTEND, DEPLOY_SERVER_FRONTEND],
    credentials: true}));
app.use(cookieParser());

const PORT = process.env.PORT;
connectDB();

const allowedOrigins = ['']

app.use("/service/ticket", ticketRoute);
app.use("/service/user", userRoute);
app.use("/service/faq", faqRoutes)

// api documentation endpoint
app.use("/helpDesk/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "HelpDesk Management API",
}))

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`));