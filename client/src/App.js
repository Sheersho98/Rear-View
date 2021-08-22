import React from 'react';
import { Container } from '@material-ui/core';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import ReviewDetails from './components/ReviewDetails/ReviewDetails';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxwidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/reviews" />} />
                    <Route path="/reviews" exact component={Home} />
                    <Route path="/reviews/search" exact component={Home} />
                    <Route path="/reviews/:id" component={ReviewDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/reviews" />)} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}


export default App;