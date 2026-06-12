import mongoose from 'mongoose'

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Đã kết nối tới CSDL thành công");
    } catch (error) {
        console.error("Kết nối tới CSDL thất bại");
        process.exit(-1);
    }
}