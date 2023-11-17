'use server'


const url ="https://aula-17-10-chi.vercel.app"

const getUserAuthenticated = async (user)=>{
    
    const responseOfApi = await fetch(url + "/user/authenticated",
     {
        cache:"no-cache",
        method:"POST",
        headers:{"Content-Type":"Application/json"},
        body: JSON.stringify(user)
     }
    
    )
   let userAuth = await responseOfApi.json();
   return userAuth

}



const getUsers = async () =>{
    
   try{
      const responseOfApi = await fetch(url + '/users', {
         cache: "no-cache"
      })
      const users = await responseOfApi.json();
      return users;
   }catch{
     return null;
   }
}

const postUser = async (user) =>{
   try {
      const responseOfApi = await fetch(url+ "/user",{
         method:"POST",
         headers: {'Content-Type':'Aplication/json'},
         body: JSON.stringify(user)
      })
      const userSave = await responseOfApi.json()
     return userSave 
   } catch{
      return null
   }
}
export { getUsers, getUserAuthenticated, postUser };