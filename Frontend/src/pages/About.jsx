import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
      </div>
      <div className='my-16 flex flex-col gap-16 md:flex-row'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-600'>
          <p>Forever was born out of passion for innovative and desired to revolutionize the way people shop online.</p>
          <p>Our Journey began with simple idea to provide the customer with his/her choice of clothes from the vast market to their doorstep.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Mission of Forever is to provide the user comfort and hassle free clothes of their choice and satify the need of the customer.</p>
        </div>
      </div>
      <div className='text-2xl py-4'>
        <Title text1={'Why'} text2={'Choose Us'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance : </b>
          <p className='text-gray-600'>We meticulosly select and deliver each product to ensure it meet the stringent quality standard.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience : </b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shoping from online store becomes easy.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service : </b>
          <p className='text-gray-600'>Our team is present here 24/7 everyday and through-out the week, to resolve the customer problem quickly.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About
