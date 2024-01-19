import express from "express";
import orderModel from "../model/orderModel.js"
const orderRouter = express.Router();
import dotenv from 'dotenv';
dotenv.config();



import Stripe from 'stripe';
import userModel from "../model/userModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


orderRouter.post('/placeorder', async (req, res) => {
    const { bucketItems, address } = req.body;

    // Construct line items
    const lineItems = bucketItems.map((item) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity || 1,
    }));

    try {
        // Create a Checkout Session with the session data
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URI}/get-membership`,
            cancel_url: `${process.env.FRONTEND_URI}/cancel`,
        });

        console.log(session);

        if (session) {
            const newOrder = new orderModel({
                name: address.name,
                email: address.email,
                userId: address.userId,
                orderTrees: bucketItems,
                shippingAddress: address,
                orderAmount: address.amount,
                transectionId: session.id,
            });

            const saveOrder = await newOrder.save();
            if (saveOrder) {
                console.log("Order saved");
            } else {
                console.log("Order not saved");
            }

            res.json({
                id: session.id,
            });
        }
    } catch (error) {
        console.error("Error creating Checkout Session:", error);
        res.status(500).json({ error: "Failed to create Checkout Session" });
    }
});




orderRouter.post('/get-membership', async (req, res) => {
    const { _id, membership } = req.body;
    try {
        const lineItems = [];

        if (membership === 'Basic') {   
            lineItems.push({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Basic Membership',
                    },
                    unit_amount: 199 * 100,
                },
                quantity: 1,
            });
        } else if (membership === 'Standard') {
            lineItems.push({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Standard Membership',
                    },
                    unit_amount: 499 * 100,
                },
                quantity: 1,
            });
        } else if (membership === 'Premium') {
            lineItems.push({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Premium Membership',
                    },
                    unit_amount: 999 * 100,
                },
                quantity: 1,
            });
        } else {
            return res.status(400).json({ error: 'Invalid membership type' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URI}/profile`,
            cancel_url: `${process.env.FRONTEND_URI}/cancel`,
        });

        if (session) {
            const giveMembership = await userModel.findByIdAndUpdate(
                { _id },
                {
                  isMember: true,
                  isMembership: membership,
                },
                { new: true }
              );

            if (giveMembership) {
                console.log('MemberShip given');
            } else {
                console.log('MemberShip not given');
            }
        }
        res.status(200).json({
            id: session.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






orderRouter.post('/getorders', async (req, res) => {
    const { userId } = req.body;
    try {
        const orders = await orderModel.find({ userId: userId }).sort({ _id: -1 }).exec();
        res.send(orders);
    } catch (error) {
        console.log(error);
    }
})


orderRouter.post('/cancel-order', async (req, res) => {
    const { orderId } = req.body;
    try {
        const cancelOrder = await orderModel.findByIdAndUpdate(
            {_id : orderId},
            {isCancelled : true},
            {new : true}
            );
        res.status(200).send(cancelOrder);
    } catch (error) {
        console.log(error);
    }
})

orderRouter.post('/admin/getAllOrders', async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ _id: -1 }).exec();
        res.send(orders);
    } catch (error) {
        console.log(error);
    }
})


orderRouter.post('/admin/delivered-order', async (req, res) => {
    const id = req.body.orderId;
    try {
        const delivered = await orderModel.findOneAndUpdate(
            { _id: id },
            { isDelivered: true },
            { new: true }
        );
        
        if (delivered) {
            res.status(200).send(delivered);
        } else {
            res.status(404).send({ error: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



orderRouter.post('/', async (req, res) => {
    const id = req.body.orderId;
    try {
        const delivered = await orderModel.findOneAndUpdate(
            { _id: id },
            { isDelivered: true },
            { new: true }
        );
        
        if (delivered) {
            res.status(200).send(delivered);
        } else {
            res.status(404).send({ error: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

export default orderRouter;
