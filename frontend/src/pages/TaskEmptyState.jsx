import { Card } from '@/components/ui/card'
import { Circle } from 'lucide-react'
import React from 'react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card className='p-8 text-center border-0 shadow-2xl bg-gradient-background'>
        <div className='space-y-3'>
            <Circle className='mx-auto size-12 text-muted-foreground'/>
            <h3 className='font-medium text-foreground'>
                {filter === "active" 
                ? "Chưa có nhiệm vụ nào đang làm"
                : filter === "completed"
                ? "Chưa có nhiệm vụ nào hoàn thành"
                : "Không có nhiệm vụ nào"}
            </h3>
            <p className='text-sm text-muted-foreground '>
                {filter === "all" ?
                "Hãy thêm nhiệm vụ để bắt đầu"
                : `Quay lại "tất cả" để thấy nhiệm vụ ${
                    filter === "active" ? "hoàn thành" : "đang làm"
                }`}
            </p>
        </div>
    </Card>
  )
}

export default TaskEmptyState
