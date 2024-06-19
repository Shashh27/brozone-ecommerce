import { useContext, useEffect, useRef} from "react"
import { Productcontext } from "../store/product_list_context"

export default function Editprofile(){

    const { handlesubmitedit , editmessage , useremail , fetchuserdetails , userdetails}= useContext(Productcontext);


    const mobileinput= useRef();
    const nameinput= useRef();
    const genderinput= useRef();
    

    const handlesubmit3=async(event)=>{
        event.preventDefault();
        handlesubmitedit(event,mobileinput.current.value,nameinput.current.value, useremail.email,genderinput.current.value);
    }

    useEffect(()=>{
        fetchuserdetails(useremail.email);
    },[fetchuserdetails,useremail.email]);

    return<>
       <div className="edit-details">
        <form onSubmit={handlesubmit3}>
        <h6>Edit details</h6>
        <div className="form-floating">
            <input type="text" className="form-control in" id="floatingInput" placeholder="name@example.com" ref={mobileinput} defaultValue={userdetails.mobile}/>
            <label htmlFor="floatingInput">Mobile Number</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control in" id="floatingInput" placeholder="name@example.com" ref={nameinput} defaultValue={userdetails.name} />
            <label htmlFor="floatingInput">Full Name</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control in" id="floatingInput" placeholder="name@example.com" ref={genderinput} defaultValue={userdetails.gender} />
            <label htmlFor="floatingInput">Gender</label>
          </div>
          <button className="btn btn-primary" type="submit">Save details</button>
          <p>{editmessage}</p>
          </form>
       </div>
    </>
}