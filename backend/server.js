import express from 'express';
import cors from 'cors';
import queueRoutes from './routes/queueRoutes.js'; 

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'], 
}));

app.use(express.json());
app.use("/api/queue", queueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
