import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import api from '@/lib/axios'
import { cn } from '@/lib/utils'
import { Calendar, CheckCircle, Circle, SquarePen, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

const TaskCard = ({task, index, handleTaskChanged}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Xóa nhiệm vụ thành công");
      handleTaskChanged();
    } catch (error) {
      toast.error("Lỗi khi xóa nhiệm vụ");
      console.error("Lỗi khi xóa nhiệm vụ");
    }
  }

  const updateTask = async () => {
    try {
     
      await api.put(`/tasks/${task._id}`, {title: updateTaskTitle});
       setIsEditting(false);
      toast.success("Cập nhật nhiệm vụ thành công");
      handleTaskChanged();
    } catch (error) {
       toast.error("Lỗi khi cập nhật nhiệm vụ");
      console.error("Lỗi khi cập nhật nhiệm vụ");
    }
  }

  const toggleButton = async () => {
    try {
      if(task.status === "active"){
      await api.put(`/tasks/${task._id}`,
        {status: "completed",
          completedAt: new Date().toISOString()
        }
      );
      toast.success("Nhiệm vụ đã làm thành công")
    }else{
      await api.put(`/tasks/${task._id}`,
        {
          status: "active",
          completedAt: null
        }
      )
      toast.success("Nhiệm vụ chưa hoàn thành, hãy hoàn thành nó")
    }

    handleTaskChanged();
    } catch (error) {
       toast.error("Lỗi khi chuyển nhiệm vụ");
      console.error("Lỗi khi chuyển nhiệm vụ");
    }
  }

  const handleKeyPress = (event) => {
    if(event.key === "Enter"){
      updateTask();
    }
  }



  return (
    <Card className={cn(
      "bg-gradient-card p-4 border-0 shadow-md hover:shadow-xl transition-all duration-200 animated-fade-in group",
      task.status === "completed" && 'opacity-75'
    )}>
      <div className='flex items-center gap-3'>
      {/* Nút tròn */}
        <Button
        variant='ghost'
        size='icon'
        className={cn(
          'flex-shrink-0 size-8 transition-all duration-200',
          task.status === "completed" ? "text-success hover:text-success/80"
          : "text-foreground hover:text-primary"
        )}
        onClick = {toggleButton}
        >
          {task.status === "completed"
          ? <CheckCircle className='size-5'/>
          : <Circle className='size-5'/>}
        </Button>

        <div className='flex-1 min-w-0'>
          {/* Tên nhiệm vụ */}
          {isEditting ? (
            <Input
              key='text'
              placeholder="Cần phải làm gì?"
              className="h-12 text-base border-0 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              value={updateTaskTitle}
              onChange={(event) => setUpdateTaskTitle(event.target.value)}
              onKeyPress = {handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ): (
            <h3
              className={cn(
                "text-base",
                task.status === "completed" ? "line-through text-muted-foreground"
                : "text-foreground"
              )}
            >
              {task.title}
            </h3>
          )}

          {/* Ngày tháng */}
          <div className='flex items-center gap-1'>
            <Calendar className='size-3 text-muted-foreground'/>
            <span className='text-xs text-muted-foreground'>
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span> - </span>
                <Calendar className='size-3 text-muted-foreground'/>
            <span className='text-xs text-muted-foreground'>
              {new Date(task.completedAt).toLocaleString()}
            </span>
              </>
            )}
          </div>
        </div>

        <div className='flex hidden gap -2 transition-color group-hover:inline-flex animate-slide-up'>
          {/* Nút chỉnh sửa */}
          <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 size-8 hover:text-info text-muted-foreground'  
            onClick = {() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen/>
          </Button>
          {/* Nút thùng rác */}
           <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 transition-colors size-8 hover:text-destructive text-muted-foreground' 
            onClick = {() => deleteTask(task._id)}
           >
            <Trash2/>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard
