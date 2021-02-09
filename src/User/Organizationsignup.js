import React , {Component} from 'react'


class Organizationsignup extends Component{

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
        
        const {name,email, password} = this.state

        const user = {
            name,
            email,
            password
        }

       // console.log(user);

     this.signup(user)
     .then(data=>{
         if(data.error) this.setState({error:data.error})
            else this.setState({

                error: "",
                name: "",
                email:"",
                password:"",
                open:true

            })
        
     })
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
        
        <form>
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
               Mobile Number
            </label>
            <input onChange={this.handleChange("mobile")} type="text" className="form-control" value={name}>
            </input>
        </div>
        <div className="form-group">
            <label className="text-muted">
                Password
            </label>
            <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}>
            </input>
        </div>
        <div className="form-group">
            <label className="text-muted">
              Confirm  Password
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
        const {name, email, password, error,open} = this.state

        return(
            <div className="container biggerFormBox">
                <h2 className="mt-5 mb-5"> 
                For Organizations
                </h2>

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

export default Organizationsignup