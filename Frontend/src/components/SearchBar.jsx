import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, products } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return showSearch ? (
    <div className='fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm transition-all duration-300'>
      <div className='w-full max-w-4xl mx-4 mt-28 scale-100 opacity-100 transition-all duration-300'>
        <div className='bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/20 relative'>
          <button
            onClick={() => setShowSearch(false)}
            className="absolute top-4 right-4 z-10 p-0 bg-transparent border-none outline-none"
            aria-label="Close"
          >
            <img
              src={assets.cross_icon}
              className="w-4 h-4"
              alt="Close"
            />
          </button>
          <div className='flex items-center p-6 border-b border-gray-200/10'>
            <div className='p-2 bg-gray-100/50 rounded-xl mr-4'>
              <img src={assets.search_icon} className='w-5 h-5 opacity-70' alt='Search' />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='flex-1 text-lg outline-none text-gray-700 bg-transparent placeholder:text-gray-400'
              type='text'
              placeholder='Search for products...'
              autoFocus
            />
          </div>

          {search && filteredProducts.length > 0 ? (
            <div className='p-4 max-h-[60vh] overflow-y-auto'>
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className='p-4 text-gray-700 bg-gray-50/50 rounded-xl cursor-pointer hover:bg-gray-100 transition'
                  onClick={() => {
                    setShowSearch(false);
                    navigate(`/product/${product._id}`);
                  }}
                >
                  <p className='text-sm font-medium'>{product.name}</p>
                  <p className='text-xs mt-1 text-gray-500'>${product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-4 text-center text-gray-500 bg-gray-50/50 rounded-xl'>
              <p className='text-sm'>No results found for "{search}"</p>
              <p className='text-xs mt-1 text-gray-400'>Try searching for something else</p>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default SearchBar;