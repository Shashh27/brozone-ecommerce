import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Signup(){

    const userid = useRef();
    const password= useRef();
    const [message,setmessage]= useState("");
    const navigate= useNavigate();

    const handlesubmit= async(event)=>{
         event.preventDefault();
    
         try {
           const response= await fetch('http://localhost:3000/signup',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              email: userid.current.value,
              password: password.current.value
            })
           })

           const data= await response.text();
           setmessage(data);

           if(message==="Registered success"){
               navigate('/login');
           }

         } catch (error) {
             console.log(error);
         }
    }

    return(
     <>
<div className="form-signin ">
      <form onSubmit={handlesubmit}>
        <h1 className="h3 mb-3 fw-normal">Sign up</h1>
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" ref={userid}/>
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={password}/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary " type="submit">Sign up</button>
      </form>
      <p className="back">{message}</p>
    </div>
    </>
    )
}