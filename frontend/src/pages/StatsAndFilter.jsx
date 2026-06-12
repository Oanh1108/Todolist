import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FilterType } from '@/lib/data'
import { Filter } from 'lucide-react'
import React from 'react'

const StatsAndFilter = ({activeTasks = 0, completedTasks = 0,setFilter, filter = "all"}) => {
  return (
    <div className='flex flex-col items-center justify-between sm:flex-row'>
    {/* Thống kê */}
      <div className='flex gap-3'>
        <Badge
        variant='secondary'
        className='text-accent-foreground bg-white/50 border-info/20'
        >
            {activeTasks} {FilterType.active}
        </Badge>

        <Badge
            variant='secondary'
            className='text-success bg-white/50 border-success/20 '
        >
            {completedTasks} {FilterType.completed}
        </Badge>
      </div>
      {/* Lọc */}
      <div className='flex gap-3'>
        {Object.keys(FilterType).map((type) => (
            <Button
                variant={filter === type ? "gradient" : "ghost"}
                key={type}
                size='sm'
                className='capitalize'
                onClick={() => setFilter(type)}
            >
                <Filter
                    className='size-4'
                />
                {FilterType[type]}
            </Button>
        ))}
      </div>
    </div>
  )
}

export default StatsAndFilter
