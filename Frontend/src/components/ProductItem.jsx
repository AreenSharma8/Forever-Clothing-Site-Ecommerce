import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

// Now accepting mrp, discount, and rating as props
const ProductItem = ({ id, image, name, price, mrp, discount, rating }) => {
  const { currency } = useContext(ShopContext)

  // Render star ratings (0-5, including half stars)
  const renderStars = (rating = 0) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="text-orange-400 text-base">&#9733;</span>) // full star
      } else if (rating >= i - 0.5) {
        stars.push(
          <span key={i} className="text-orange-400 text-base">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{display: 'inline', verticalAlign: 'middle'}}>
              <defs>
                <linearGradient id={`half${i}`}>
                  <stop offset="50%" stopColor="currentColor"/>
                  <stop offset="50%" stopColor="white"/>
                </linearGradient>
              </defs>
              <polygon points="10,1.5 12.8,7.6 19.4,8.2 14.1,12.8 15.7,19.2 10,15.8 4.3,19.2 5.9,12.8 0.6,8.2 7.2,7.6" fill={`url(#half${i})`} stroke="currentColor" strokeWidth="1"/>
            </svg>
          </span>
        )
      } else {
        stars.push(<span key={i} className="text-gray-300 text-base">&#9733;</span>) // empty star
      }
    }
    return stars
  }

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
      </div>
      {/* Product name on its own line */}
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      {/* Ratings row on its own line */}
      <div className="flex items-center pb-1">
        {renderStars(rating)}
      </div>
      {/* Price row with MRP and discount, all on one line */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{currency}{price}</span>
        {mrp && (
          <span className="text-sm line-through text-gray-400">M.R.P: {currency}{mrp}</span>
        )}
        {discount && (
          <span className="text-sm text-green-600 font-semibold">({discount}% off)</span>
        )}
      </div>
    </Link>
  )
}

export default ProductItem