import React , {Component} from 'react'
import {Redirect} from "react-router-dom"
import SocialLogin from "./SocialLogin";

class Signin extends Component{

    constructor(){
        super()
        this.state={
            email:"",
            password:"",
            error:"",
            redirectToReferer:false,
            loading:false
        }
    }

    handleChange = (name) => (event)=>{
        this.setState({
            [name]:event.target.value
        });

    }

    authenticate = (jwt,next)=>{
        if(typeof window != "undefined"){
            localStorage.setItem("jwt",JSON.stringify(jwt))
            next()
        }
    }

    clickSubmit = event=>{
        event.preventDefault();

        this.setState({loading:true})
        
        const {email, password} = this.state

        const user = {
           
            email,
            password
        }

       // console.log(user);

     this.signin(user)
     .then(data=>{
         if(data.error) this.setState({error:data.error,loading:false})
            else {
                //authenticate
                this.authenticate(data,()=>{
                    this.setState({redirectToReferer:true})
                })

            }
        
     })
    }

    signin = user =>{
      return  fetch('http://localhost:8080/api/signin',{
            method:"POST",
            headers:{
                 Accept:"application/JSON",
                 
                 "Content-type":"application/json"
 
            },
 
            body:JSON.stringify(user)
         })
            .then(
                response=>{
                    return response.json()
 
                }
            )
             .catch(err=>{
                 console.log(err)
             })

    }

    signinForm = (   email, password) =>(
        
        <form>
        
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
            Submit
        </button>
     </form>
    )


    render(){
        //const {}
        const { email, password, error ,redirectToReferer,loading } = this.state

        if(redirectToReferer) {
            
            return <Redirect to="/"/>


        }

        return(
            <div className="container">
                <h2 className="mt-5 mb-5"> 
                Sign in
                </h2>
                <hr />
                <SocialLogin />
                <hr />

                <div className="alert alert-danger" style={{

                    display:error?"":"none"
                }}>
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

                {this.signinForm(  email, password)}
            </div>
        )
    }
}   

export default Signin
