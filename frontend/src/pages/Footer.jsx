import React from 'react'

const Footer = ({completedTaskCount = 0, activeTaskCount = 8}) => {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <>
          <div className='text-sm text-center text-muted-foreground'>
            <p>
              {completedTaskCount > 0 && (
                <>
                  Tuyệt vời! Bạn đã hoàn thành {completedTaskCount} việc
                  {activeTaskCount > 0 && (
                    `, còn ${activeTaskCount} nữa thôi`
                  )}
                </>
              )}
              {completedTaskCount === 0 && activeTaskCount > 0 && (
                <>
                  Hãy bắt tay vào làm {activeTaskCount}  nhiệm vụ nào
                </>
              )}
            </p>
          </div>
        </>
      )}
    </>
  )
}

export default Footer
