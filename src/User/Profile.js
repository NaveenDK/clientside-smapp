import React, {Component} from 'react'
import {isLoggedIn} from '../auth'
import { Redirect, Link } from 'react-router-dom'
import {read} from './apiUser'
import DefaultProfile from '../images/avatar.png'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'


class Profile extends Component{

            constructor(){
                    super()
                    this.state={
                        user:{ following:[], followers:[]},
                        redirectToSignin:false,
                        following:false,
                        error: ''
                    }
                }
                
                //check follow

        checkFollow = user => {
            const jwt = isLoggedIn()
            const match = user.followers.find(follower=>{
                //one id has many other ids(followers) and vice versa
                return follower._id=== jwt.user._id
            })
            return match

        }

        //This will 

        clickFollowButton = callApi =>{
          //  callApi()  
       //  const user_Id = this.props.match.params.user_Id
       const user_Id = isLoggedIn().user._id
         const token =  isLoggedIn().token;
        console.log("1>>\n"); console.log(user_Id)
        console.log("2>>\n");  console.log(token)
        console.log("3>>\n");   console.log(this.state.user._id)
          callApi(user_Id,token, this.state.user._id)
          .then(data=>{
              if(data.error){
                  this.setState({error:data.error})
              }
              else{
                  this.setState({user:data, following:!this.state.following})
              }
          })

        }






       
        init = (userId) =>{
        const token = isLoggedIn().token 
          read(userId, token)
            .then(data=>{
                if(data.error){
                this.setState({redirectToSignin:true})

                }else{
                    let following = this.checkFollow(data)

                    this.setState({ user:data , following})
                }
            })

        }


        componentDidMount(){
            
            console.log("user id from route params:", this.props.match.params.user_Id);

            const user_Id = this.props.match.params.user_Id;
            this.init(user_Id);

              
        }


        componentWillReceiveProps(props){
            const user_Id = props.match.params.user_Id
            this.init(user_Id)
        }


        render() {

                const {redirectToSignin, user}  = this.state
                if(redirectToSignin) return <Redirect to="/signin" />

                
                const photoUrl = user._id ?  `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`: DefaultProfile;


                return (

                    <div className="container">
                        <h2 className="mt-5 mb-5"> Profile</h2>
                        <div className="row">
                            <div className="col-md-6">
                            
                            <img  style={{height: "200px", width:'auto'}} 
                                  className="img-thumbnail"
                                  src ={photoUrl} alt={this.state.name}
                                  onError = {i =>(i.target.src= `${DefaultProfile}`)}
                             />

                            </div>
                            <div className="col-md-6 mt-2">
                           
                                    <p> Hello {user.name}</p>
                                    <p> Email: {user.email}</p>
                                    <p>{
                                            `Joined ${new Date(
                                                this.state.user.created
                                            ).toDateString()}`
                                            }
                                    </p>
                                {isLoggedIn().user && isLoggedIn().user._id == user._id? (
                                    <div className="d-inline-block mt-5">
                                        <Link 
                                        className="btn btn-raised btn-success mr-5"
                                        to={`/user/edit/${user._id}`}
                                        >
                                            Edit Profile
                                        </Link>
                                        <DeleteUser user_Id={user._id}/>
                                    </div>
                                ):
                                <p>
                                    
                                    <FollowProfileButton following={this.state.following}
                                    
                                    onButtonClick={this.clickFollowButton}
                                    />
                                </p>
                                }        
                                
                            </div>  
                        </div>
                        <div className="row">
                             <div className="col md-12 mt-5 mb-5">
                                 <hr/>
                                 <p className="lead">{user.about}</p>
                                 <hr/>
                             </div>
                        </div>
                    </div>

                )


            }

}

export default Profile;