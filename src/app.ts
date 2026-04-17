/** Express application setup */
import express from 'express';
import userRoutes from './routes/user.route';

const app = express();
app.use(express.json());

app.use('/api/manipulate', userRoutes);

export default app;