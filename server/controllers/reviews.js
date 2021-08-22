import express from 'express';
import  mongoose  from "mongoose";

import ReviewMessage from "../models/reviewMessage.js";

const router = express.Router();

export const getReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await ReviewMessage.findById(id);

        res.status(200).json(review);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getReviews = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; //get starting index of every page 
        const total = await ReviewMessage.countDocuments({});

        const reviews = await ReviewMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        //console.log(reviewMessages);

        res.status(200).json({ data: reviews, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getReviewsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');

        const reviews = await ReviewMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] });

        
        res.json({ data: reviews });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createReview = async (req, res) => {
    const review = req.body;

    const newReview = new ReviewMessage({...review, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newReview.save();

        res.status(201).json(newReview);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateReview = async (req, res) => {
    const { id:_id } = req.params;
    const review = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedReview = await ReviewMessage.findByIdAndUpdate(_id, { ...review, _id }, {new: true});
    
    res.json(updatedReview);  
}

export const deleteReview = async (req, res) => {
    const{ id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await ReviewMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully'});
}

export const likeReview = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const review = await ReviewMessage.findById(id);

    const index = review.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        //like a post
        review.likes.push(req.userId);
    } else {
        //dislike a liked post
        review.likes = review.likes.filter((id) => id !== String(req.userId));
    }

    const updatedReview = await ReviewMessage.findByIdAndUpdate(id, review, { new: true });

    res.json(updatedReview);
}

export default router;