import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <>
      <SearchBar />
      <div className='flex items-center justify-between py-5 font-medium bg-primary'>
        <Link to='/'>
          <img
            src={assets.logo1}
            className='w-40 h-auto object-contain'
            alt='Kana by Kavya'
          />
        </Link>

        <ul className='hidden sm:flex gap-5 text-sm text-textColor'>
          <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p className='text-[16px]'>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p className='text-[16px]'>Collection</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='about' className='flex flex-col items-center gap-1'>
            <p className='text-[16px]'>About</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p className='text-[16px]'>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className='w-5 cursor-pointer'
            alt=''
          />

          <div
            className='relative'
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <img
              onClick={() => (token ? null : navigate('/login'))}
              src={assets.profile_icon}
              className='w-5 cursor-pointer'
              alt='profile'
            />

            {token && showDropdown && (
              <div className='absolute right-0 pt-4 z-20'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                  <p
                    onClick={() => navigate('/profile')}
                    className='cursor-pointer hover:text-black'
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('/orders')}
                    className='cursor-pointer hover:text-black'
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className='cursor-pointer hover:text-black'
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt='' />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className='w-5 cursor-pointer sm:hidden'
            alt=''
          />
        </div>

        {/* Sidebar Menu for small screen */}
        <div
          className={`fixed top-0 right-0 bottom-0 z-50 transition-all duration-300 ${
            visible ? 'w-full max-w-xs' : 'w-0'
          } bg-primary/95 shadow-lg overflow-hidden sm:hidden`}
          style={{ minWidth: visible ? '220px' : '0' }}
        >
          <div className='flex flex-col text-gray-700 h-full'>
            <div className='flex items-center gap-4 p-3 cursor-pointer border-b border-gray-200'>
              <img
                onClick={() => setVisible(false)}
                src={assets.dropdown_icon}
                className='h-4 rotate-180'
                alt=''
              />
              <p className='font-medium text-base'>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b border-gray-200 font-medium transition-colors ${
                  isActive
                    ? 'text-[#B22222] bg-white'
                    : 'text-gray-800 hover:bg-white/80'
                }`
              }
              to='/'
            >
              <span className='text-lg'>Home</span>
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b border-gray-200 font-medium transition-colors ${
                  isActive
                    ? 'text-[#B22222] bg-white'
                    : 'text-gray-800 hover:bg-white/80'
                }`
              }
              to='/collection'
            >
              <span className='text-lg'>Collection</span>
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b border-gray-200 font-medium transition-colors ${
                  isActive
                    ? 'text-[#B22222] bg-white'
                    : 'text-gray-800 hover:bg-white/80'
                }`
              }
              to='/about'
            >
              <span className='text-lg'>About</span>
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b border-gray-200 font-medium transition-colors ${
                  isActive
                    ? 'text-[#B22222] bg-white'
                    : 'text-gray-800 hover:bg-white/80'
                }`
              }
              to='/contact'
            >
              <span className='text-lg'>Contact</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
