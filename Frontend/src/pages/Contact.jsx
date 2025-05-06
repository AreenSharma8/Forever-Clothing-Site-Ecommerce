import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'Contact'} text2={'Us'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-20'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-satrt gap-6'>
          <p className='font-semibold txet-xl text-gray-700'>Our Store</p>
          <p className='text-gray-500'>G-1,2,3,4,5 Korporate Komplex, Vadodara <br /> F-12,13,14 Ray-c-den-c Komplex, Ahmedabad</p>
          <p className='text-gray-500'>Tel : +915872399074 <br /> Email : Forever78@gamil.com</p>
          <p className='font-semibold text-xl text-gray-700'>Work at Forever</p>
          <p className='text-gray-500'>Learn more about us.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-[10px]'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact
