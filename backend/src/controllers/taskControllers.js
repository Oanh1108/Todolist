import Task from '../models/Task.js'

export const getAllTasks = async (req, res) =>{
    try {
        // .find là để lấy toàn bộ dữ liệu từ collection task
        //sort({createAt: -1}) => sắp xếp từ dưới lên
        const tasks = await Task.find().sort({createAt: -1});
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Lỗi khi gọi getAllTasks", error);
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}

export const createTasks = async (req, res) => {
    try {
        // Lấy cái title mà client gửi lên request body
        const {title} = req.body;
        //Tạo 1 task mới => mình dùng model task và truyền vào 1 đối tượng có trường title
        const task = new Task({title});
        //Lưu task mới xuống database
        const newTask = await task.save();
        res.status(201).json({message: "Nhiệm vụ tạo thành công"});
    } catch (error) {
        console.error("Lỗi khi gọi createTasks", error);
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}

export const updateTasks = async (req, res) => {
    try {
        //Lấy những trường có thể update 
        const {title, status, completedAt} = req.body;
        // Tạo 1 biến để lấy nhiệm vụ sau khi update
        const updateTasks = await Task.findByIdAndUpdate(
            //Truyền vào 3 tham số
            // Tham số 1: req.params.id => Cách lấy ID từ URL
            req.params.id,
            //Tham số 2: Chứa đối tượng mà mình muốn update => 3 trường này thì lấy từ trong request body.
            {
                title,
                status,
                completedAt
            },
            //Tham số 3: Sau khi update xong nó sẽ trả về giá trị sau khi update => Nếu không có dòng này thì sẽ trả về giá trị trước khi update 
            {new: true}
        );

        //Kiểm tra xem updatedTasks có tồn tại không
        if(!updateTasks){
            return res.status(401).json({message: "Nhiệm vụ không tồn tại"})
        }
        
        res.status(200).json({ message: "Nhiệm vụ đã được cập nhật thành công" });
    } catch (error) {
        console.error("Lỗi khi gọi updateTasks", error);
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}

export const deleteTasks = async(req, res) => {
   try {
    const deleteTasks = await Task.findByIdAndDelete(req.params.id);
    if(!deleteTasks){
          return res.status(401).json({message: "Nhiệm vụ không tồn tại"})
    }
     res.status(200).json({message: "Nhiệm vụ đã được xóa thành công"});
   } catch (error) {
      console.error("Lỗi khi gọi deleteTasks", error);
        res.status(500).json({message: "Lỗi hệ thống"})
   }
}