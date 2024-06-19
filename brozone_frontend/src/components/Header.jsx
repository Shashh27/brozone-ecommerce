import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import Hearticon from "./Hearticon";
import Bagicon from "./Bagicon";
import ProfileCard from "./Profilecard";

export default function Header({menu,setmenu}){
     const [showpcard,setpcard]= useState(false)

     const togglepcard=()=>[
      setpcard(!showpcard)
     ]

    return <>
       <div className="main-head">
         <img src="./public/Myntra-Logo.png"/>
         <ul className="men-head">
            <li onClick={()=>setmenu("men")} className={menu==="men"?"active":""}><Link className="link" to="/">Men</Link></li>
            <li onClick={()=>setmenu("women")} className={menu==="women"?"active":""}><Link className="link" to="/women">Women</Link></li>
            <li onClick={()=>setmenu("kids")} className={menu==="kids"?"active":""}><Link className="link" to="/kids">Kids</Link></li>
         </ul>
         <div>
            <ul className="right-head">
                <input type="text" placeholder="search for products"/>
                <li className="profile"><CgProfile className="heart-icon" onClick={()=>togglepcard()} /><p className="pro">Profile</p></li>
                {showpcard && <ProfileCard/>}
                <li className="profile"><Link className="link" to="/wishlist"><Hearticon/></Link><p className="pro"><Link className="link" to="/wishlist">Wishlist</Link></p></li>
                <li className="profile"><Link className="link" to="/bag"><Bagicon /></Link><p className="pro"><Link className="link" to="/bag">Bag</Link></p></li>
            </ul>
         </div>
       </div>
    </>
}