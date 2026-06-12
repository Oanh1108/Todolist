import React, { useEffect, useState } from 'react'
import Header from './Header'
import AddTask from './AddTask'
import StatsAndFilter from './StatsAndFilter'
import TaskList from './TaskList'
import TaskListPagination from './TaskListPagination'
import DateTimeFilter from './DateTimeFilter'
import Footer from './Footer'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery])

  useEffect(() => {
    setPage(1);
  },[filter, dateQuery])

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.")
    }
  }
  
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed': 
        return task.status === 'completed';
      default:
        return true;
    }
  })

   const handleNext = () => {
    if(page < totalPages){
      setPage((prev) => prev + 1);
    }
  }

  const handlePrev = () => {
    if(page > 1){
      setPage((prev) => prev - 1);
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  
  const handleTaskChange = () => {
    fetchTasks();
  }

  const visibleTasks = filteredTasks.slice(
     (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  
  if(visibleTasks.length === 0){
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

 
  
  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
  {/* Dreamy Sky Pink Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
    }}
  />
    {/* Your Content/Components */}
    <div className='container relative z-10 p-8 mx-auto'>
        <div className='w-full max-w-2xl p-8 mx-auto space-y-6'>
            <Header/>
            <AddTask handleNewTaskAdded={handleTaskChange}/>
            <StatsAndFilter
              filter={filter}
              setFilter={setFilter}
              activeTasks={activeTaskCount}
              completedTasks={completedTaskCount}
            />
            <TaskList filteredTasks={visibleTasks} filter={filter} handleTaskChanged={handleTaskChange}/>
            <div className='flex flex-col items-center justify-between sm:flex-row'>
                <TaskListPagination
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  handlePageChange={handlePageChange}
                  page={page}
                  totalPages={totalPages}
                />
                <DateTimeFilter
                  dateQuery={dateQuery}
                  setDateQuery={setDateQuery}
                />
            </div>
            <Footer
               activeTaskCount={activeTaskCount}
              completedTaskCount={completedTaskCount}
            />
        </div>
    </div>
</div>

    
  )
}

export default HomePage
