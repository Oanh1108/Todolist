import {Toaster} from 'sonner';
import {BrowserRouter, Routes, Route} from "react-router"
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

function App() {
  
  return (
    <>
    <Toaster/>
    {/* Bọc toàn bộ ứng dụng bằng BrowserRouter để bật chế độ routing cho React */}
      <BrowserRouter>
      {/* Routes số nhiều để chứa danh sách các round */}
        <Routes>
        {/* Có path là / nghĩa là trang chủ */}
          <Route path='/' element={<HomePage/>}/>
           <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
