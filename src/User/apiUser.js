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

  export const list = (user_Id, token)=>{
            
    return   fetch(`${process.env.REACT_APP_API_URL}/users`,{
          method:"GET"
      })
      .then(response =>{
          return response.json();
      })
      .catch(err=>console.log(err))


  }
