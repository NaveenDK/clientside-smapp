import React, {Component} from "react"
import {isLoggedIn} from '../auth'
import {read,update} from './apiUser'
import {Redirect} from 'react-router-dom'

class EditProfile extends Component {


    constructor(){
        super();
        this.state={
            id:"",
            name:"",
            email:"",
            password:"",
            redirectToProfile:false,
            fileSize: 0,
            loading:false
        }
    }


    init = (userId) =>{
        const token = isLoggedIn().token 
          read(userId, token)
            .then(data=>{
                if(data.error){
                this.setState({redirectToSignin:true})

                }else{
                    this.setState({ id:data._id, name:data.name, email:data.email,
                        error: ''
                    
                    })
                }
            })

        }


        isValid = () =>
        {
            const { name, email, password} = this.state
            if(name.length === 0){
                this.setState({error: "Name is required"})
                return false 
            }
            if(!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)){
                this.setState({error: "Please check your email"})
                return false 
            }
            if(password.length >=1 && password.length <=5){
                this.setState({error: "Password must be at least 6 characters long"})
                return false 
            }
            return true

        }

        componentDidMount(){
            this.userData = new FormData()

            console.log("user id from route params:", this.props.match.params.user_Id);
            const user_Id = this.props.match.params.user_Id;
            this.init(user_Id);
        }

        handleChange = (name) => (event)=>{

            const value = name === 'photo'? event.target.files[0] : event.target.value
            const fileSize = name === 'photo' ? event.target.files[0].size:0;
            this.userData.set(name,value)
            this.setState({
                [name]: value, fileSize
            });
    
        }
    
        clickSubmit = event=>{
            event.preventDefault();
            this.setState({loading:true})
           if(this.isValid()){
      
    
           
           // console.log(user);
           const user_Id = this.props.match.params.user_Id
           const token = isLoggedIn().token;

           update(user_Id, token, this.userData).then(data =>{
               if(data.error) this.setState({error:data.error})
               else 
                this.setState({
                    redirectToProfile:true
                })
           })
           }
        }

        signupForm = (name, email, password) =>(
        
            <form>
             <div className="form-group">
                <label className="text-muted">
                   Profile Photo
                </label>
                <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"  >
                </input>
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Name
                </label>
                <input onChange={this.handleChange("name")} type="text" className="form-control" value={name}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">
                    Email
                </label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}>
                </input>
            </div>
           
            <div className="form-group">
                <label className="text-muted">
                    Password
                </label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}>
                </input>
            </div>
        
            <button onClick={this.clickSubmit}className="btn btn-raised btn-primary">
               Update
            </button>
         </form>
        )


    render() {

        const {id, name, email, password, redirectToProfile ,error,loading} = this.state

        if(redirectToProfile){
          return   <Redirect to={`/user/${id}`}/>
        }

        return (

            <div className="container">
                <h2 className="mt-5 mb-5"> Edit Profile</h2>
                <div className="alert alert-primary" style={{
                            display:error?"":"none"}}>
                    {error}
                </div>
              
                {loading? (<div className="jumbotron text-center">

                        <h2>

                            Loading..
                        </h2>

                        </div>):
                        (
                        ""
                        )
                        }

                {this.signupForm(name, email, password)}
            </div>

        )

        }
    }

export default EditProfile