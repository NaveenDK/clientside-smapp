import React, {Component} from 'react'
import {isLoggedIn} from '../auth'

class DeleteUser extends Component{


deleteAccount = ()=>{
    
    const token = isLoggedIn().token
    const userId = this.props.userId
    remove(userId,token)
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
        return(
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                 Delete Profile
            </button>
        )
    }
}

export default DeleteUser