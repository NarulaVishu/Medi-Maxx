// import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-3xl text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-2xl' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className=' text-gray-500'>H. No. 144544 shastri Colony <br /> Ambala, Govt Property</p>
          <p className=' text-gray-500'>Tel: +1 (234) 567-890 <br /> support@medimax.com</p>
          <p className=' font-semibold text-lg text-gray-600'>CAREERS AT MEDI-MAX</p>
          <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border  px-8 py-4 text-sm hover:bg-primary hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
