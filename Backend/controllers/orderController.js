import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';

// Global Variables
const currency = 'inr';
const delivery_charges = 20;

// Stripe Gateway initialize
import Stripe from 'stripe';
import Razorpay from 'razorpay';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_SECRET_KEY,
})

// Placing order using COD Method
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.user.id;  // ✅ Get userId from req.user set by authUser middleware

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: 'Order Placed Successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.user.id;

        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((items) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: items.name
                },
                unit_amount: items.price * 100
            },
            quantity: items.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: delivery_charges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success:false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({success:true, session_url: session.url})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Verifying order using Stripe Method
const verifyStripe = async (req,res) => {
    
    const { orderId, success, userId } = req.body
    
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});
            res.json({success:true});
        }    
        else{
            await orderModel.findByIdAndDelete(orderId, {payment:false});
            res.json({success:false});
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Placing order using RazorPay Method
const placeOrderRazorPay = async (req, res) => {
    
    try {
        const { items, amount, address } = req.body;
        const userId = req.user.id;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: req.body.amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if(error){
                console.log(error)
                return res.json({success:false,message:error.message})
            }
            res.json({success:true, order})
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

};

const verifyRazorPay = async (req, res) => {
    try {
        
        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: 'Payment Successful' })
        }
        else{
            res.json({ success: false, message: 'Payment Failed' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

};

const userOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

export { verifyRazorPay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus };
