import React from 'react'
import {Route,Switch } from 'react-router-dom'
import Home from './core/Home';
import Signup from './User/Signup';


const MainRouter = () =>(
    <div>
        <Switch>
        <Route path="/signup" component={Signup}>
                </Route>
                <Route path="/" component={Home}>
                </Route>
               
        </Switch>
    </div>
)

export default MainRouter;