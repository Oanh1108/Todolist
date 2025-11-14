import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const AddTask = () => {
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className='flex flex-col gap-3 sm:flex-row'>
        <input type='text' placeholder='Cần phải làm gì' 
          className='h-12 px-4 text-base bg-slate-50 sm:flex-1 border-2 border-primary/50 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
        >
        <Plus className='size-5'/>
        Thêm</Button>
      </div>
    </Card>
  )
}

export default AddTask
