// import React from 'react'
// import {Link, withRouter} from 'react-router-dom'


// const isActive = (history,path)=>{
//     if(history.location.pathname === path)  return {

//         color:'#000000'

//     }
//     else return {
//         color:'#ffffff'
//     }
// }

// export const signout = (next)=>{
//     if (typeof window!== "undefined") localStorage.removeItem("jwt")
//     next()
//     return fetch("http://localhost:8080/signout", {
//         method:"GET"
//     })
//     .then(response) => {
//         return response.json()
//     }
// }

// const Menu = ({history}) =>(
//     <div>
       
        
//        <ul className="nav nav-tabs bg-primary">
//             <li className="nav-item">
//             <Link className="nav-link" style={isActive(history,"/")} to="/" >Home</Link>
//             </li>
//             <li className="nav-item">
//             <Link  className="nav-link"   style={isActive(history,"/signin")}  to="/signin" >Sign In</Link>
//             </li>
//             <li classNames="nav-item">
//             <Link className="nav-link" style={isActive(history,"/signup")}  to="/signup" >Sing Up</Link>
//             </li>
//     </ul>
        

//     </div>
// )

// export default withRouter(Menu);
