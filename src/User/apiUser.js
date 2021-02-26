export const read = (user_Id, token)=>{
            
    return   fetch(`${process.env.REACT_APP_API_URL}/user/${user_Id}`,{
          method:"GET",
          headers:{
              Accept:"application/json",
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}`
          }
      })
      .then(response =>{
          return response.json();
      })
      .catch(err=>console.log(err))


  }

export const update = (user_Id, token,user)=>{

    console.log("UPDATE USER ", user)
            
    return   fetch(`${process.env.REACT_APP_API_URL}/user/${user_Id}`,{
          method:"PUT",
          headers:{
              Accept:"application/json",
              Authorization:`Bearer ${token}`
          },
          body: user
      })
      .then(response =>{
          return response.json();
      })
      .catch(err=>console.log(err))

  }

  export const remove = (user_Id, token)=>{
            
    return   fetch(`${process.env.REACT_APP_API_URL}/user/${user_Id}`,{
          method:"DELETE",
          headers:{
              Accept:"application/json",
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}`
          }
      })
      .then(response =>{
          return response.json();
      })
      .catch(err=>console.log(err))


  }

  export const list = (user_Id, token)=>{
            
    return   fetch(`${process.env.REACT_APP_API_URL}/users`,{
          method:"GET"
      })
      .then(response =>{
          return response.json();
      })
      .catch(err=>console.log(err))


  }


  export const updateUser = (user,next)=> {
      if(typeof window !== 'undefined'){
          if(localStorage.getItem('jwt')){
              let auth = JSON.parse(localStorage.getItem('jwt'))
              auth.user = user
              localStorage.setItem('jwt',JSON.stringify(auth))
              next()
          }
      }
  }

  export const follow = (user_Id, token,follow_Id)=>{

    //console.log("UPDATE USER ", user)
            
    return   fetch(`${process.env.REACT_APP_API_URL}/user/follow `,{
          method:"PUT",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
          },
          body: JSON.stringify({user_Id,follow_Id})
      })
      .then(response =>{
          return response.json();
      })
      .catch(err=>console.log(err))

  }
