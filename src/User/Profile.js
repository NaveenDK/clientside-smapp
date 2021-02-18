import React, {Component} from 'react'
import {isLoggedIn} from '../auth'
import { Redirect, Link } from 'react-router-dom'
import {read} from './apiUser'

class Profile extends Component{

            constructor(){
                    super()
                    this.state={
                        user:"",
                        redirectToSignin:false
                    }
                }

       
        init = (userId) =>{
        const token = isLoggedIn().token 
          read(userId, token)
            .then(data=>{
                if(data.error){
                this.setState({redirectToSignin:true})

                }else{
                    this.setState({ user:data })
                }
            })

        }


        componentDidMount(){
            
            console.log("user id from route params:", this.props.match.params.user_Id);

            const user_Id = this.props.match.params.user_Id;
            this.init(user_Id);

              
        }



        render() {

                const {redirectToSignin, user}  = this.state
                if(redirectToSignin) return <Redirect to="/signin" />


                return (

                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                    
                                    <h2 className="mt-5 mb-5"> Profile</h2>
                                    <p> Hello {isLoggedIn().user.name}</p>
                                    <p> Email: {isLoggedIn().user.email}</p>
                                    <p>{
                                            `Joined ${new Date(
                                                this.state.user.created
                                            ).toDateString()}`
                                            }
                                    </p>
                            </div>
                            <div className="col-md-6">
                                {isLoggedIn().user && isLoggedIn().user._id == user._id && (
                                    <div className="d-inline-block mt-5">
                                        <Link 
                                        className="btn btn-raised btn-success mr-5"
                                        to={'/user/edit/${user._id}'}
                                        >
                                            Edit Profile
                                        </Link>
                                        <button className="btn btn-raised btn-danger">
                                            Delete Profile
                                        </button>
                                    </div>
                                )}        
                                
                            </div>
                        </div>
                    </div>

                )


            }

}

export default Profile;