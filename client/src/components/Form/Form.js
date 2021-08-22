import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';


import useStyles from './styles';
import { createReview, updateReview } from '../../actions/reviews';

const Form = ({ currentId, setCurrentId }) => {
    const [reviewData, setReviewData] = useState({
        title: '', description:'',tags:'',selectedFile:''
    });
    const review = useSelector((state) => currentId ? state.reviews.reviews.find((r) => r._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    

    useEffect(() => {
        if(review) setReviewData(review);
    }, [review]);

    
    const clear = () => {
        setCurrentId(0);
        setReviewData({ title: '', description:'',tags:'',selectedFile:'' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updateReview( currentId, { ...reviewData, name: user?.result?.name }));
        } else {
            dispatch(createReview({ ...reviewData, name: user?.result?.name}));
        }
        clear();


    };

    if(!user?.result?.name) {
        return (
            <Paper className={classes.Paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own Reviews and like other's Reviews.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant ="h6">{currentId ? 'Update' : 'Write'} a Reivew</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth  value={reviewData.title} onChange={(e) => setReviewData({ ...reviewData, title:e.target.value })}/>
            <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={6} value={reviewData.description} onChange={(e) => setReviewData({ ...reviewData, description:e.target.value })}/>
            <TextField name="tags" variant="outlined" label="Tags (comma separated) " fullWidth value={reviewData.tags} onChange={(e) => setReviewData({ ...reviewData, tags:e.target.value.split(',') })}/>
            <div className={classes.fileInput}>
                <FileBase
                    typle="file"
                    multiple={false}
                    onDone={({ base64 }) => setReviewData({ ...reviewData, selectedFile: base64 })}
                />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    );
}

export default Form;