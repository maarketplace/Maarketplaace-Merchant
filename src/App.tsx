import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useContext } from 'react';
import { ThemeContext } from './context/DarkTheme';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
function App() {
  const { darkMode, Toggle } = useContext(ThemeContext);
  return (
    <div className={`${darkMode && "dark"}`}>
      <RouterProvider router={router} />
      <button className='absolute w-16 h-16 bottom-2 left-2 bg-[#FFc300] dark:bg-white rounded-full dark:text-black font-semibold flex items-center justify-center'

        onClick={Toggle}>
        {darkMode ?
          <MdOutlineLightMode
            className='w-[30px] h-[30px] text-center'
          />
          :
          <MdOutlineNightlight
            className='w-[30px] h-[30px] text-center'
          />}
      </button>
    </div>
  )
}

export default App
