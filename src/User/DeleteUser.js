import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {isLoggedIn} from '../auth'
import {remove} from './apiUser'
import {signout} from '../auth'

class DeleteUser extends Component{


state ={
    redirect: false
};


deleteAccount = ()=>{
    
    const token = isLoggedIn().token
    const user_Id = this.props.user_Id
    remove(user_Id,token)
    .then(data=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            //sign out user
            signout(()=> console.log("User is deleted"))
            //redirect
            this.setState({redirect:true})
        }
    })
}

    
deleteConfirmed = () => {
    let answer = window.confirm(
        "Are you sure you want to delete your account?"
    )
    if(answer){
        this.deleteAccount()
    }
}


    render(){
        if(this.state.redirect){
            return <Redirect to = '/'/>
        }
        return(
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                 Delete Profile
            </button>
        )
    }
}

export default DeleteUser