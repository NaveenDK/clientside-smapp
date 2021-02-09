import React from 'react'
import {Route,Switch } from 'react-router-dom'
import Home from './core/Home';
//import Menu from './core/Menu';
import Signup from './User/Signup';
import Signin from './User/Signin';
import Membersignup from './User/Membersignup';
import Organizationsignup from './User/Organizationsignup';


const MainRouter = () =>(
    <div>
        {/* <Menu/> */}
        <Switch>
        <Route exact path="/" component={Home}>
        </Route>
        <Route exact path="/signup" component={Signup}>
        </Route>
        <Route exact path="/signin" component={Signin}>
        </Route>
        <Route exact path="/membersignup" component={Membersignup}>
        </Route>
        <Route exact path="/organizationsignup" component={Organizationsignup}>
        </Route>
               
        </Switch>
    </div>
)

export default MainRouter;