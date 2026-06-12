import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import dns from 'dns'
import { connectDB } from './config/data.js';
dns.setServers(["1.1.1.1","8.8.8.8"])
import taskRoute from './routes/taskRoute.js'
import cors from 'cors'

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({origin: ["http://localhost:5173","http://localhost:5174"]}))

app.use("/api/tasks", taskRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server đang kết nối tới cổng ${PORT}`); 
    })
})

