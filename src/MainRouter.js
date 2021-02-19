import React from 'react'
import {Route,Switch } from 'react-router-dom'
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './User/Signup';
import Signin from './User/Signin';
import Profile from './User/Profile';
import Users from './User/Users';


const MainRouter = () =>(
    <div>
         <Menu/> 
        <Switch>
        <Route exact path="/" component={Home}>
        </Route>
        
        <Route exact path="/users" component={Users}>
        </Route>
        <Route exact path="/signup" component={Signup}>
        </Route>
        <Route exact path="/signin" component={Signin}>
        </Route>
        <Route exact path="/signin" component={Signin}>
        </Route>
        <Route exact path="/user/:user_Id" component={Profile}>
        </Route>
       

               
        </Switch>
    </div>
)

export default MainRouter;