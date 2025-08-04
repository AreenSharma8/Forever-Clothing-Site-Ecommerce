import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title'; // Make sure to update the path as necessary
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext);  // This is the way we can import the API using useContext
    const [bestSeller, setBestSeller] = useState([]); 
    
    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'Best'} text2={'Sellers'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 text-center'>
                    Loved by Many, Chosen by You
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) =>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    );
}

export default BestSeller;
