import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        // You can add newsletter signup logic here
    }

  return (
    <div className='text-center py-12 bg-primary/50 rounded-lg mx-4 my-8'>
      <div className='max-w-2xl mx-auto px-4'>
        <h2 className='text-3xl font-semibold text-gray-800 mb-2'>Welcome Bonus!</h2>
        <p className='text-2xl font-medium text-secondary mb-3'>Get 15% Extra Discount on Your First Purchase</p>
        <p className='text-gray-600 mt-3 mb-6'>Join our community of fashion enthusiasts and enjoy exclusive benefits, early access to new collections, and special offers.</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 flex flex-col sm:flex-row items-center gap-3 mx-auto my-6'>
          <div className='w-full relative'>
            <input 
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-secondary transition-colors' 
              type="email" 
              placeholder='Enter your email address' 
              required
            />
          </div>
          <button 
            type='submit' 
            className='w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-medium px-8 py-3 rounded-lg transition-colors whitespace-nowrap'
          >
            Claim 15% Off
          </button>
        </form>
        <p className='text-sm text-gray-500'>*Discount code will be sent to your email</p>
      </div>
    </div>
  )
}

export default NewsletterBox
