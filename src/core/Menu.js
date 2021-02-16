import React from 'react'
import {Link, withRouter} from 'react-router-dom'


const isActive = (history,path)=>{
    if(history.location.pathname === path)  return {

        color:'#000000'

    }
    else return {
        color:'#ffffff'
    }
}

export const signout = (next)=>{
    if (typeof window!== "undefined") localStorage.removeItem("jwt")
    next()
    return fetch("http://localhost:8080/api/signout", {
        method:"GET"
    })
    .then(response => {
        return response.json()
    }
    )
}

export const isLoggedIn = () =>{

    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}

const Menu = ({history}) =>(
    <div> 
       <ul className="nav nav-tabs blue">
            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,"/")} to="/" >Home</Link>
            </li>

            {!isLoggedIn() && 
            <>
            <li className="nav-item">
            <Link  className="nav-link"   style={isActive(history,"/signin")}  to="/signin" >Sign In</Link>
            </li>
            <li classNames="nav-item">
            <Link className="nav-link" style={isActive(history,"/signup")}  to="/signup" >Sign Up</Link>
            </li>
            </>
            }

           {isLoggedIn() &&
            <>
            <li classNames="nav-item">
            <Link className="nav-link" style={isActive(history,"/signup")}   onClick={()=>signout(()=>history.push('/'))} >Sign Out</Link>
            </li>
            <li classNames="nav-item">
            <Link className="nav-link" >{isLoggedIn().user.name}</Link>
            </li>
            </>
           }

    </ul>
        

    </div>
)

export default withRouter(Menu);
