import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useContext } from 'react';
import { ThemeContext } from './context/DarkTheme';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import { Toaster } from 'react-hot-toast';
function App() {
  const { darkMode, Toggle } = useContext(ThemeContext);
  return (
    <div className={`${darkMode && "dark"} bg-white dark:bg-black`}>
      <RouterProvider router={router} />
      <button className='fixed w-10 h-10 bottom-4 right-4 bg-[#FFC300]  rounded-full dark:text-black font-semibold flex items-center justify-center  max-[650px]:animate-slideUp'
        onClick={Toggle}>
        {darkMode ?
          <MdOutlineLightMode
            className='w-[20px] h-[20px] text-center'
          />
          :
          <MdOutlineNightlight
            className='w-[20px] h-[20px] text-center'
          />}
      </button>
      <Toaster />
    </div>
  )
}

export default App
