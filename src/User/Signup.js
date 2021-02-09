import React , {Component} from 'react'
import {Link} from 'react-router-dom'

class Signup extends Component{

    constructor(){
        super()
        this.state={
            name:"",
            email:"",
            password:"",
            error:"",
            open:false
        }
    }

    handleChange = (name) => (event)=>{
        this.setState({
            [name]:event.target.value
        });

    }

    clickSubmit = event=>{
        event.preventDefault();
  
    }

    signup = user =>{
      return  fetch('http://128.199.82.155/api/signup',{
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

    signupForm = (name, email, password) =>(
        

        <form >
      <div className="formBox">
      <div className="pt-2"></div> 
      <h1 class="h3 mb-3 font-weight-normal"> Sign Up</h1>
     
      <div className="pt-5"></div> 
      <h4> Please select  <br></br> registration type</h4>
      <div className="pt-4"></div>
        <Link to="/membersignup" > <div class="btn btn-raised btn-primary fixed-width">
      I'm an individual</div>
        </Link> 
         <div className="pt-2"></div>
        <Link to="/organizationsignup" >  <div class="btn btn-raised btn-primary fixed-width">
      We're an organization </div>
            </Link>
 </div>
     </form>
    )


    render(){
        //const {}
        const {name, email, password, error,open} = this.state

        return(
            <div className="container">
                

                <div className="alert alert-primary" style={{

                    display:error?"":"none"
                }}>
                        {error}
                </div>

                
                <div className="alert alert-info" style={{
                    display:open?"":"none"
                }}>
                 New Account is successfully created, please sign in.
                </div>

                {this.signupForm(name, email, password)}
            </div>
        )
    }
}

export default Signup