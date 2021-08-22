import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import reviewRoutes from './routes/reviews.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/reviews', reviewRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Rear View API');
});

//const CONNECTION_URL = "mongodb+srv://testUser:qLwjye7U0EnOJxBu@cluster0.7zugv.mongodb.net/rear_view?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedToplogy:true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error));


mongoose.set('useFindAndModify', false);