import mongoose from "mongoose";

// Định nghĩa cấu trúc dữ liệu cho 1 Task
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status:{
            type: String,
            enum: ["active", "complete"],
            default:"active",
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true, //CreatedAt và UpdatedAt tự động thêm vào
    }
);

// Tạo model giữa trên nó
// Sinh ta 1 model tên Task => sử dụng model này để thao tác với dữ liệu như là tạo mới, chỉnh sửa, xóa đi hoặc là lấy dữ liệu 
const Task = mongoose.model("Task", taskSchema);
export default Task;