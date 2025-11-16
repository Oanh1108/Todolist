import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Headers from '@/components/Headers'
import StatAndFiller from '@/components/StatAndFilter'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useState } from 'react'
import { toast } from 'sonner'

const HomePage = () => {
  
  return (
    <div className='container pt-8 mx-auto'>
      <div className='w-full max-w-2xl pt-6 mx-auto space-y-6'>
      {/* đẦU TRANG */}
      <Headers/>

      {/* Tạo nhiệm vụ */}
      <AddTask/>

      {/* Thống kê và bộ lọc */}
      <StatAndFiller/>

      {/* Danh sách nhiệm vụ */}
      <TaskList/>

      {/* Phân trang và lọc theo ngày */}
      <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
      <TaskListPagination/>
      <DateTimeFilter/>
      </div>

      {/* Chân trang */}
      <Footer/>
      </div>
    </div>
  )
}

export default HomePage
