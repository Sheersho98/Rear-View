import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';

import Pagination from '../Pagination';
import Reviews from '../Reviews/Reviews';
import Form from '../Form/Form';
import { getReviews, getReviewBySearch } from '../../actions/reviews';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');


    const searchReview = () => {
        
        //dispatch to fetch search review
        if(search.trim()==="" && (tags.length === 0)){
            history.push('/');
        } else {
            dispatch(getReviewBySearch({ search, tags: tags.join(",") }));
            history.push(`/reviews/search?searchQuery=${search || 'none'}&tags=${tags.join(',')} `);
        }
        //setSearch('');
        //setTags([]);    

    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //search post
            searchReview();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} >
                    <Grid item xs={12} sm={6} md={9}>
                        <Reviews setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search Reviews" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
                            <ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
                            <Button onClick={searchReview} className={classes.searchButton} color="primary" variant="contained" >Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                        <Paper elevation={6} className={classes.pagination}>
                            <Pagination page={page}/>
                        </Paper>
                        )}
                        
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}



export default Home;