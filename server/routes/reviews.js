import express from 'express';

import { getReview, getReviews, getReviewsBySearch, createReview, updateReview, deleteReview, likeReview } from '../controllers/reviews.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getReviewsBySearch)
router.get('/', getReviews);
router.get('/:id', getReview);
router.post('/', auth, createReview);
router.patch('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);
router.patch('/:id/likeReview', auth, likeReview);

export default router;