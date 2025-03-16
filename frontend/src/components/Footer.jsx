// import React from 'react'
// import { assets } from '../assets/assets'
import logo from '../assets/logo1.png'
import { NavLink} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <NavLink to='/' ><li>Home</li></NavLink>
            <NavLink to='/about' ><li>About us</li></NavLink>
            <NavLink to='/doctors' ><li>Delivery</li></NavLink>
            <NavLink to='/privacy' ><li>Privacy policy</li></NavLink>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1 (234) 567-890</li>
            <li>support@medimax.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ Medi-Max.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
