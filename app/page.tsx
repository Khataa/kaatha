// 'use client' 
import axios from "axios";
import { useEffect, useState } from "react"

interface User{
  name : string,
  email : string
}

// export default function Home (){
//   const [user, setuser] = useState<User|null>(null);
//   useEffect(()=>{
//     async function getUserDetails(){
//       const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
//       return response.data;
//     }
//     getUserDetails().then(setuser);
//   }, [])
//   if(!user){
//     return <h1>loading ...</h1>
//   }
//   return (
//     <h1>
//       {user.name}<div></div>
//       {user.email}
//     </h1>
//   )
// }

export default async function UserPage(){
  async function getUserDetails() : Promise<User> {
    const response = await axios.get("http://localhost:3000/api/user")
    return response.data as User;
  }
  const user : User = await getUserDetails();
  return(
    <h1>
      {user.name}<div></div>{user.email}
    </h1>
  )
}