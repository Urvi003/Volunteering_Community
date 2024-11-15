import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import RegisteredVolunteerRoutes from "./router/RegisteredVolunteerRoutes.js";
import eventRegistrationRoutes from "./router/eventRegistrationRoutes.js"; // Import event routes
import checkoutRouter from "./router/checkoutRouter.js";

const app = express();
dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
    methods: ["POST","GET","PUT","DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/volunteer", RegisteredVolunteerRoutes);
app.use("/api/v1/event", eventRegistrationRoutes);
app.use("/api/v1", checkoutRouter);
app.use("/api/v1/volunteer/login",RegisteredVolunteerRoutes);
app.use("/api/v1/event/:eventId/register",eventRegistrationRoutes);
app.use("/api/v1/volunteer/:id",RegisteredVolunteerRoutes)
app.use("/api/v1/volunteer/:id/events",RegisteredVolunteerRoutes)
app.use("/api/v1/volunteer/:id/change-password",RegisteredVolunteerRoutes);
app.use('/api/v1/donations/total', checkoutRouter);

dbConnection();

export default app;