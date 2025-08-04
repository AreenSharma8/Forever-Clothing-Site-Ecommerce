import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('Relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProduts.slice();

    switch (sortType) {
      case 'Low - High':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'High - Low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTER
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded-md ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-semibold text-black'>CATEGORIES</p>
          <div className='flex flex-col gap-3 text-sm font-normal text-gray-800'>
            {['Men', 'Women', 'Kids'].map((label) => (
              <label key={label} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={label}
                  onChange={toggleCategory}
                  className="accent-[#B22222]"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded-md ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-semibold text-black'>TYPE</p>
          <div className='flex flex-col gap-3 text-sm font-normal text-gray-800'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((label) => (
              <label key={label} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={label}
                  onChange={toggleSubCategory}
                  className="accent-[#B22222]"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border border-gray-300 px-3 py-1 text-sm rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#B22222]'
          >
            <option value="Relevant">Sort by : Relevant</option>
            <option value="Low - High">Sort by : Low - High</option>
            <option value="High - Low">Sort by : High - Low</option>
          </select>
        </div>

        {/* Product Grid or No Products Message */}
        {
          filterProduts.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterProduts.map((item, index) => (
                  <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                ))
              }
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center text-center mt-10 text-gray-500'>
              <div className='mb-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" color="#bb2222" fill="none">
                  <path d="M12 22C11.1818 22 10.4002 21.6708 8.83693 21.0123C4.94564 19.3734 3 18.5539 3 17.1754V7.54234M12 22C12.8182 22 13.5998 21.6708 15.1631 21.0123C19.0544 19.3734 21 18.5539 21 17.1754V7.54234M12 22V12.0292M21 7.54234C21 8.15478 20.1984 8.54152 18.5953 9.315L15.6741 10.7244C13.8712 11.5943 12.9697 12.0292 12 12.0292M21 7.54234C21 6.9299 20.1984 6.54316 18.5953 5.76969L17 5M3 7.54234C3 8.15478 3.80157 8.54152 5.40472 9.315L8.32592 10.7244C10.1288 11.5943 11.0303 12.0292 12 12.0292M3 7.54234C3 6.9299 3.80157 6.54317 5.40472 5.76969L7 5M6 13.0263L8 14.0234" stroke="#bb2222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M10 2L12 4M12 4L14 6M12 4L10 6M12 4L14 2" stroke="#bb2222" strokeWidth="1.5" strokeLinecap="round"></path>
                </svg>
              </div>
              <p className='text-base sm:text-lg font-medium text-red-700'>
                Sorry, no products are available right now!
              </p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Collection
