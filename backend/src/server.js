import express from 'express';
import taskRouter from './routes/tasksRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Tạo biến PORT từ biến môi trường hoặc mặc định là 5001
const PORT = process.env.PORT || 5001;

// Tạo ứng dụng Express
const app = express();

//middlewares
app.use(express.json());
//app.use(cors()) => cho phép tất cả domain gọi API
// Cho phép truy cập 1 domain cố định
app.use(cors({origin: "http://localhost:5173"}))


app.use('/api/tasks', taskRouter);

// Kết nối database thành công trước rồi server mới chạy
connectDB().then(()=>{
    // Lắng nghe kết nối trên cổng 5001
// Các cổng phổ biến là : 8000, 8080, 5000, 5001, 5173, 3000
app.listen(PORT, () => {
    console.log('Server is running on port {PORT}');
})
});