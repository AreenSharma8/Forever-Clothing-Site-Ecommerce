import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (currentState === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
      }
      
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirect after successful login/signup
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[50%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Sign Up' && (
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          type='text' 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Name' 
          required
        />
      )}
      <input 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        type='email' 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        required
      />
      <input 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        type='password' 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' 
        required
      />
      <div className='w-full justify-between flex text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Password?</p>
        <p 
          onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} 
          className='cursor-pointer'>
          {currentState === 'Login' ? 'Create Account' : 'Login Here'}
        </p>
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 rounded-[10px]'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
