import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({ 
    title: String,
    description: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },

 });

 const ReviewMessage = mongoose.model('ReviewMessage', reviewSchema);

 export default ReviewMessage;