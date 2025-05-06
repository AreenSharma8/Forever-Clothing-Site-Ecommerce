import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorPay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/placeorder', authUser, placeOrder);
orderRouter.post('/placeorderstripe', authUser, placeOrderStripe);  
orderRouter.post('/placeorderrazorpay', authUser, placeOrderRazorPay);

// User Feature
orderRouter.post('/userorders', authUser, userOrders);

// Verify Payment
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verifyRazorPay', authUser, verifyRazorPay);

export default orderRouter;