import express from 'express';
import taskRouter from './routes/tasksRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Tạo biến PORT từ biến môi trường hoặc mặc định là 5001
const PORT = process.env.PORT || 5001;

// Tạo ứng dụng Express
const app = express();

// Kết nối database thành công trước rồi server mới chạy
connectDB().then(()=>{
    // Lắng nghe kết nối trên cổng 5001
// Các cổng phổ biến là : 8000, 8080, 5000, 5001, 5173, 3000
app.listen(PORT, () => {
    console.log('Server is running on port {PORT}');
})
});

app.use(express.json());
app.use('/api/tasks', taskRouter);

