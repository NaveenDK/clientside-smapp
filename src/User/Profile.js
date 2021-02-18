import React, {Component} from 'react'
import {isLoggedIn} from '../auth'
import { Redirect } from 'react-router-dom'

class Profile extends Component{

            constructor(){
                    super()
                    this.state={
                        user:"",
                        redirectToSignin:false
                    }
                }


        componentDidMount(){
            
            console.log("user id from route params:", this.props.match.params.user_Id);

            const user_Id = this.props.match.params.user_Id;
                fetch(`${process.env.REACT_APP_API_URL}/user/${user_Id}`,{
                    method:"GET",
                    headers:{
                        Accept:"application/json",
                        "Content-Type": "application/json",
                        Authorization:`Bearer ${isLoggedIn().token}`
                    }
                })
                .then(response =>{
                    return response.json();
                })
                .then(data=>{
                    if(data.error){
                    this.setState({redirectToSignin:true})

                    }else{
                        this.setState({ user:data })
                    }
                })
        }



        render() {

                const redirectToSignin = this.state.redirectToSignin
                if(redirectToSignin) return <Redirect to="/signin" />


                return (

                    <div className="container">

                            <h2 className="mt-5 mb-5"> 
                            Profile
                            </h2>
                            <p> Hello {isLoggedIn().user.name}</p>
                            <p> Email: {isLoggedIn().user.email}</p>
                            <p>{
                                `Joined ${new Date(
                                    this.state.user.created
                                ).toDateString()}`
                                }</p>

                    </div>

                )


            }

}

export default Profile;