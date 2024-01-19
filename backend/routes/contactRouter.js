// contactRouter.js

import express from "express";
import ContactModel from '../model/contactModel.js';

const contactRouter = express.Router();

contactRouter.post('/contact', async (req, res) => {
    try {
        const { userId, name, message } = req.body.contactMessage;
        const existingUserMessage = await ContactModel.findOne({ userId });
        if (existingUserMessage) {
            existingUserMessage.messages.push({
                message,
                timestamp: new Date()
            });

            await existingUserMessage.save();
        } else {
            const newUserMessage = new ContactModel({
                userId,
                name,
                messages: [{
                    message,
                    timestamp: new Date()
                }]
            });

            await newUserMessage.save();
        }

        return res.status(200).json({
            message: "Successfully sent",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error while sending message"
        });
    }
});

export default contactRouter;
