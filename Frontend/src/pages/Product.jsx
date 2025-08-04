import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

// Helper for date formatting as "20 July 2025"
function formatReviewDate(date = new Date()) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

// Review component
const ReviewSection = ({ productId, reviews, addReview, deleteReview, productSizes, productColors }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(productSizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(productColors[0] || 'Pink');
  const fileInput = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment && rating && selectedSize && selectedColor) {
      addReview({
        id: Date.now(),
        name: "You",
        comment,
        rating,
        image,
        date: formatReviewDate(),
        size: selectedSize,
        color: selectedColor
      });
      setComment('');
      setRating(0);
      setImage(null);
      setSelectedSize(productSizes[0] || '');
      setSelectedColor(productColors[0] || 'Pink');
      fileInput.current.value = '';
    }
  };

  return (
    <div className="w-full mt-12 flex flex-col gap-8">
      {/* Review summary */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-white rounded-xl p-6 shadow flex-1">
          <h3 className="text-xl font-semibold mb-2">Customer reviews</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-orange-500 text-2xl font-bold">{(reviews.length > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) : '0.0')}</span>
            <div className="flex">{[1,2,3,4,5].map(i=>(
              <svg key={i} width="18" height="18" fill={i<=Math.round(reviews.length > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0)/reviews.length : 0) ? "#ff9900":"#e0e0e0"} viewBox="0 0 20 20"><polygon points="10,1.5 12.8,7.6 19.4,8.2 14.1,12.8 15.7,19.2 10,15.8 4.3,19.2 5.9,12.8 0.6,8.2 7.2,7.6"/></svg>
            ))}</div>
            <span className="text-gray-500 text-sm">({reviews.length})</span>
          </div>
          {/* Ratings breakdown */}
          <div className="flex flex-col gap-1">
            {[5,4,3,2,1].map(star=>(
              <div key={star} className="flex items-center gap-1">
                <span className="w-8 text-xs">{star} star</span>
                <div className="bg-gray-200 rounded h-2 w-32 relative">
                  <div className="bg-orange-400 absolute left-0 top-0 h-2 rounded"
                    style={{
                      width: `${reviews.length ? (reviews.filter(r=>r.rating===star).length/reviews.length)*100 : 0}%`
                    }}></div>
                </div>
                <span className="ml-2 text-xs">{reviews.filter(r=>r.rating===star).length}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow flex-1">
          <h4 className="font-semibold mb-3">Review this product</h4>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label className="text-sm font-medium">Your rating</label>
            <div className="flex gap-1 mb-2">
              {[1,2,3,4,5].map(i=>(
                <svg
                  key={i}
                  onClick={()=>setRating(i)}
                  className="cursor-pointer"
                  width="22" height="22"
                  fill={i<=rating ? "#ff9900" : "#e0e0e0"}
                  viewBox="0 0 20 20"
                >
                  <polygon points="10,1.5 12.8,7.6 19.4,8.2 14.1,12.8 15.7,19.2 10,15.8 4.3,19.2 5.9,12.8 0.6,8.2 7.2,7.6"/>
                </svg>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <label className="text-sm font-medium flex flex-col">Size
                <select
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                  className="border rounded p-1 mt-1 text-sm"
                  required
                >
                  {productSizes.map((sz, idx) => (
                    <option key={idx} value={sz}>{sz}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-medium flex flex-col">Color
                <select
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                  className="border rounded p-1 mt-1 text-sm"
                  required
                >
                  {productColors.map((col, idx) => (
                    <option key={idx} value={col}>{col}</option>
                  ))}
                </select>
              </label>
            </div>
            <textarea
              className="border rounded p-2 text-sm mb-2"
              placeholder="Write your review..."
              value={comment}
              onChange={e=>setComment(e.target.value)}
              rows={3}
              required
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={handleImageChange}
              className="mb-2"
            />
            {image && (
              <img src={image} alt="Review" className="w-20 h-20 object-cover rounded mb-2 border" />
            )}
            <button type="submit" className="w-fit px-4 py-2 text-sm rounded bg-black text-white hover:bg-gray-800 active:bg-gray-900">Submit Review</button>
          </form>
        </div>
      </div>
      {/* Review images */}
      {reviews.some(r=>r.image) && (
        <div>
          <h4 className="font-semibold mb-2">Reviews with images</h4>
          <div className="flex gap-3 overflow-x-auto py-2">
            {reviews.filter(r=>r.image).map((r,i)=>(
              <img key={i} src={r.image} alt="Review" className="h-24 w-24 object-cover rounded shadow"/>
            ))}
          </div>
        </div>
      )}
      {/* Top reviews */}
      <div>
        <h4 className="font-semibold mb-3">Top reviews</h4>
        <div className="flex flex-col gap-4">
          {reviews.map((r,i)=>(
            <div key={r.id} className="rounded-xl border p-4 bg-white/80 flex flex-col md:flex-row gap-2 relative">
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">{r.name?.charAt(0)}</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{r.name}</span>
                    <div className="flex">{[1,2,3,4,5].map(i2=>(
                      <svg key={i2} width="16" height="16" fill={i2<=r.rating ? "#ff9900":"#e0e0e0"} viewBox="0 0 20 20"><polygon points="10,1.5 12.8,7.6 19.4,8.2 14.1,12.8 15.7,19.2 10,15.8 4.3,19.2 5.9,12.8 0.6,8.2 7.2,7.6"/></svg>
                    ))}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Reviewed on {r.date} | Size: {r.size} | Colour: {r.color}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2">{r.comment}</div>
                {r.image && <img src={r.image} alt="Review" className="w-24 h-24 object-cover rounded mb-2" />}
              </div>
              {r.name === "You" && (
                <button
                  onClick={() => deleteReview(r.id)}
                  className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                  title="Delete this review"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('Pink');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Kiran Sarkar",
      comment: "Good quality, fabric and fit.",
      rating: 4,
      image: null,
      date: "28 June 2025",
      size: "L",
      color: "White"
    },
    {
      id: 2,
      name: "Yash",
      comment: "Good Product for this Price, decent fit. Description is Regular Fit but mentioned Slim Fit on product, but actual fit is Regular.",
      rating: 4,
      image: null,
      date: "15 July 2025",
      size: "XL",
      color: "Nautical"
    },
    {
      id: 3,
      name: "Lithin Siddhu",
      comment: "Super bro mind blowing quality. Worth of money u will satisfy",
      rating: 5,
      image: null,
      date: "16 June 2025",
      size: "2XL",
      color: "Nautical"
    }
  ]);

  useEffect(() => {
    const prod = products.find((item) => item._id === productId);
    if (prod) {
      setProductData(prod);
      setImage(prod.image[0]);
      setSize(prod.sizes && prod.sizes[0] ? prod.sizes[0] : '');
      setColor(prod.colors && prod.colors[0] ? prod.colors[0] : 'Pink');
    }
  }, [productId, products]);

  const addReview = (review) => {
    setReviews([review, ...reviews]);
  };

  const deleteReview = (reviewId) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  // Helper for price section
  function calcDiscounted(mrp, discount) {
    if (!mrp || !discount) return null;
    return Math.round(mrp - (mrp * discount) / 100);
  }

  // Color options for product (default to Pink if not present)
  const colorOptions = productData?.colors && productData.colors.length > 0
    ? productData.colors
    : ["Pink"];

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-200 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border ${item===image?'border-black':'border-transparent'}`}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto rounded-xl" src={image} alt="" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[1,2,3,4].map(i=>(
              <svg key={i} width="18" height="18" fill="#ff9900" viewBox="0 0 20 20"><polygon points="10,1.5 12.8,7.6 19.4,8.2 14.1,12.8 15.7,19.2 10,15.8 4.3,19.2 5.9,12.8 0.6,8.2 7.2,7.6"/></svg>
            ))}
            <svg width="18" height="18" fill="#e0e0e0" viewBox="0 0 20 20"><polygon points="10,1.5 12.8,7.6 19.4,8.2 14.1,12.8 15.7,19.2 10,15.8 4.3,19.2 5.9,12.8 0.6,8.2 7.2,7.6"/></svg>
            <p className="pl-2 text-base">({reviews.length})</p>
          </div>
          {/* Price section */}
          <div className="mt-5 flex items-end gap-3 flex-wrap">
            <span className="text-3xl font-medium">{currency}{productData.price}</span>
            {productData.mrp && (
              <span className="text-base text-gray-400 line-through">M.R.P: {currency}{productData.mrp}</span>
            )}
            {productData.discount && (
              <span className="text-base text-green-600 font-semibold">
                ({productData.discount}% off)
              </span>
            )}
          </div>
          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>
          {/* Color selector */}
          <div className="mt-5 flex items-center gap-2">
            <span className="font-medium text-base">Select Color:</span>
            <div className="flex gap-2">
              {colorOptions.map((col, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setColor(col)}
                  className={`w-8 h-8 rounded-full border-2 focus:outline-none focus:ring-2 ${color === col ? 'border-black ring-2 ring-black' : 'border-gray-300'} flex items-center justify-center`}
                  style={{ backgroundColor: col.toLowerCase() }}
                  title={col}
                >
                  {color === col && (
                    <svg width="18" height="18" fill="white" viewBox="0 0 20 20">
                      <polyline points="5,11 9,15 15,7" stroke="black" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <span className="ml-2 text-base">{color}</span>
          </div>
          {/* Size selector */}
          <div className="mt-8">
            <p className="mb-2 font-medium">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`
                    px-5 py-2 rounded border transition
                    ${size === item
                      ? 'bg-black text-white border-black shadow'
                      : 'bg-white text-black border-gray-300 hover:bg-gray-100'}
                    text-base font-semibold
                  `}
                  key={index}
                  style={{minWidth: 50}}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm rounded mt-8 shadow active:bg-gray-700 hover:bg-red-800 transition-colors duration-200"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery is Available</p>
            <p>Easy Return and Exchange Policy within 7 Days</p>
          </div>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex flex-wrap">
          <b className="border px-5 py-3 text-sm bg-white rounded-tl-xl rounded-tr-xl shadow">Description</b>
          <b className="border px-5 py-3 text-sm bg-white ml-6 rounded-tl-xl rounded-tr-xl shadow">Reviews ({reviews.length})</b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 bg-white/80 rounded-b-xl shadow">
          <p>{productData.description}</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g.: sizes, color, age)</p>
        </div>
        {/* Review section */}
        <ReviewSection
          productId={productId}
          reviews={reviews}
          addReview={addReview}
          deleteReview={deleteReview}
          productSizes={productData.sizes}
          productColors={colorOptions}
        />
      </div>
      {/* Related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className="opacity-0"></div>
};

export default Product;