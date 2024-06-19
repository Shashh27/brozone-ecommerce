import { useContext, useEffect } from "react"
import { Productcontext } from "../store/product_list_context"
import Wishlistproduct from "./Wishlistproduct"

export default function Wishlist(){
   const {wishproducts , fetchwishlist , useremail}= useContext(Productcontext);

   useEffect(()=>{
    if(useremail.email){
        fetchwishlist(useremail.email);
    }
   },[fetchwishlist,useremail.email]);
    return<>
     <div>
        <div className="bag-card">
            {wishproducts.length==0 && <li><img src="./public/wishlist.webp"/><h4>Your wishlist is empty</h4><p>Lets add some items</p><a href="/" className="btn btn-primary">Continue Shopping</a></li>}
        </div>
        <div className="wish-card">
       {wishproducts.map((item)=>(
        <Wishlistproduct id={item.id} img={item.image} brand={item.brand} detail={item.detail} rs={item.price}/>
       ))}
     </div>
     </div>
    </>
}