import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-blue-400 justify-between items-center text-white text-[18px]'>
      <div className="logo">
        <span className='font-bold text-[20px] mx-8'>iTask</span>
      </div>
        <ul className="flex sm:flex-col md:flex-row justify-between gap-10 px-50 py-4 rounded-2xl h-15">
            <li><a href="#" className='hover:underline hover:text-[20px] duration-100 transition-all'>Home</a></li>
            <li><a href="#" className='hover:underline hover:text-[20px] duration-100 transition-all'>About</a></li>
            <li><a href="#" className='hover:underline hover:text-[20px] duration-100 transition-all'>Contact</a></li>
        </ul>
    </nav>
  )
}
export default Navbar
