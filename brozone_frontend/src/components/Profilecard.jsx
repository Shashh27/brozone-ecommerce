import React, { useContext , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Productcontext } from '../store/product_list_context';

export default function Profilecard() {

  const {useremail,logout , userdetails , fetchuserdetails}= useContext(Productcontext);

  useEffect(()=>{
    fetchuserdetails(useremail.email);
},[fetchuserdetails,useremail.email]);

  return (
    <div className="profile-card">
      {useremail.isloggedin ? <><h6>Hello  {userdetails.name}</h6></> : <>
      <h5>Welocome</h5>
      <p>To access account and manage orders</p>
      <a href="/login" className="btn btn-primary buton">LOGIN / SIGNUP</a></>}
      <hr/>
      <p ><Link to="/bag" className='link'>Orders </Link></p>
      <p><Link to="/wishlist" className='link'>Wishlist </Link> </p>
      <hr/>
      {useremail.isloggedin && <><p><Link to='/edit' className='link'>Edit Profile</Link></p>
      <p onClick={()=>logout()}><a href='/' className='link' >Log Out</a> </p></>}
    </div>
  );
}
