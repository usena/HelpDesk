import FAQ from '../models/Faq.js';
import mongoose from 'mongoose';

export const createFaq = async (req, res) => {
    try {
        const { question, answer} = req.body
        if (!question || !answer) {
            return res.status(400).json({message: "Please fill the required fields!"})
        }

        const newFaq = await FAQ.create({
            question,
            answer
        });
        res.status(200).json({message: "Create a FAQ successfully!", newFaq})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}