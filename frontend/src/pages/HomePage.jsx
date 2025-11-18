import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Headers from '@/components/Headers'
import StatAndFiller from '@/components/StatAndFilter'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

const HomePage = () => {
  //Lưu danh sách nhiệm vụ từ backend về
  //Buffer có nghĩa là chỗ để gom dữ liệu lại sau đó mới xử lý tiếp. Trong trường hợp này, buffer sẽ hợp lý hơn là cái chữ list danh sách. Bởi vì dữ liệu từ backend trả về chưa phải là thứ người dùng sẽ thấy ngay mà nó còn có thể phải qua bước lập theo trạng thái rồi phân trang rồi mới hiển thị lên giao diện
  const [taskBuffer, setTaskBuffer] = useState([]);

  //Lưu giá trị của active count và complete count
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);

  //Lưu filter hiện tại
  const [filter, setFilter] = useState("all");
  
  useEffect(()=>{
    fetchTasks();
  },[])

  //Logic
  //Gọi API và lấy danh sách nhiệm vụ
  const fetchTasks = async (req, res) => {
    try {
      // Gọi API bằng axios và truyền vào URL của backend
      const res = await axios.get("http://localhost:5001/api/tasks")
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks: ", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks")
      
    }
  }

  //Biến để lưu danh sách nhiệm vụ lọc
  const filteredTasks = taskBuffer.filter((task)=>{
    switch (filter) {
      case "active":
        return task.status === 'active';
      case "completed":
        return task.status === 'completed';
      default:
        return true;
    }
  })

  return (
    <div className="relative w-full min-h-screen">
  {/* Aurora Dream Corner Whispers */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
    }}
  />
  {/* Your content goes here */}
    <div className='container pt-8 mx-auto'>
      <div className='relative z-10 w-full max-w-2xl pt-6 mx-auto space-y-6'>
      {/* đẦU TRANG */}
      <Headers/>

      {/* Tạo nhiệm vụ */}
      <AddTask/>

      {/* Thống kê và bộ lọc */}
      <StatAndFiller
        filter={filter}
        setFilter={setFilter}
        activeTasksCount={activeTaskCount} completedTaskCount={completeTaskCount}
      />

      {/* Danh sách nhiệm vụ */}
      <TaskList filteredTasks={filteredTasks} filter={filter}/>

      {/* Phân trang và lọc theo ngày */}
      <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
      <TaskListPagination/>
      <DateTimeFilter/>
      </div>

      {/* Chân trang */}
      <Footer
        activeTaskCount={activeTaskCount}
        completedTaskCount={completeTaskCount}
      />
      </div>
    </div>
</div>
  
  )
}

export default HomePage
