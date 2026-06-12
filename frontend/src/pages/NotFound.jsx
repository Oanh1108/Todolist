import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-6 bg-slate-50'>
        <img
            src='/404_NotFound.png'
            alt='notfound'
            className='max-w-2xl mb-8 w-96'
        />

        <p className='text-xl font-semibold'>
            Bạn đã đi vào vùng cấm địa
        </p>

        <a 
        href='/'
        className='inline-block p-2 font-bold text-white transition shadow-2xl bg-primary rounded-2xl hover:bg-primary-dark'>
            Quay về trang chủ
        </a>
    </div>
  )
}

export default NotFound