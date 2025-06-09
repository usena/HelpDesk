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

dotenv.config();
const app = express();

const LOCAL_SERVER_FRONTEND = process.env.LOCAL_SERVER_FRONTEND;
const DEPLOY_SERVER_FRONTEND = process.env.DEPLOY_SERVER_FRONTEND;

const allowedOrigins = [LOCAL_SERVER_FRONTEND, DEPLOY_SERVER_FRONTEND];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like Postman or same-origin)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT;
connectDB();

app.use("/service/ticket", ticketRoute);
app.use("/service/user", userRoute);
app.use("/service/faq", faqRoutes)

// api documentation endpoint
app.use("/helpDesk/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "HelpDesk Management API",
}))

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`));