import cors from "cors";
import express, { Application } from 'express';
import bookingRoutes from "./routes/bookingRoutes";
import hotelRoutes from "./routes/hotelRoutes";

const app: Application = express();

// Allow requests from specific origins
app.use(
    cors({
      origin: "http://localhost:3000", // Replace with your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      credentials: true, // If using cookies or authentication headers
    })
  );

app.use(express.json());
app.use('/api/booking', bookingRoutes);
app.use('/api/hotel', hotelRoutes);

export default app;