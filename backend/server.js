import express from 'express';
import cors from 'cors';
import queueRoutes from './routes/queueRoutes.js'; // Ensure correct import

const app = express();

// Use CORS to allow requests from the frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Allow the frontend's origin
  methods: ['GET', 'POST'], // Allow GET and POST requests
}));

app.use(express.json());
app.use("/api/queue", queueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
