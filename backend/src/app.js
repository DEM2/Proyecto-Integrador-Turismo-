import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import aiRoutes from "./routes/ai.routes.js";
import paymentsRoutes from './routes/payments.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/ai", aiRoutes);
app.use('/api/payments', paymentsRoutes)

export default app;
