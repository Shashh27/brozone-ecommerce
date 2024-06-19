import { useContext, useEffect } from "react"
import { Productcontext } from "../store/product_list_context"
import Bagproduct from "./Bagproduct";
import { MdCurrencyRupee } from "react-icons/md";

export default function Bag(){
    const {bagproducts , fetchproducts , useremail}= useContext(Productcontext);

    let total_mrp= 0;
    let discount= 199;
    let shipping= 99;
    let total_amount= 0;

    bagproducts.map((item)=>(
      total_mrp += parseInt(item.price)
    ))

    total_amount = total_mrp- discount + shipping;

    useEffect(()=>{
      if(useremail.email){
        fetchproducts(useremail.email);
      }
    },[fetchproducts,useremail.emal]);

  return(
    <>
    
    <div className="bag-card" >
     {bagproducts.length==0 && <li><img src="./public/empty-bag.webp"/><h4>Hey,it feels so light</h4><p>There's nothing in your bag.Lets add some items</p><a href="/" className="btn btn-primary">Add items from wishlist</a></li>}
     </div>
     <div className="cart-main">
     <div className="bag-main">
     {bagproducts.map((item)=>(
        <Bagproduct id={item.id} img={item.image} brand={item.brand} detail={item.detail} rs={item.price}/>
     ))}
      </div>
      {bagproducts.length>=1 && 
      <div className="bag-sum">
         <p>PRICE DETAILS ({bagproducts.length} {bagproducts.length > 1 ? 'items' : 'item'})</p>
         <li><p>Total MRP</p> <p><MdCurrencyRupee />{total_mrp}</p></li>
         <li><p>Discount on MRP</p><span><MdCurrencyRupee />199</span></li>
         <li><p>Shipping Fee</p><p><MdCurrencyRupee />99</p></li>
         <hr/>
         <li><p>Total Amount</p><p><MdCurrencyRupee />{total_amount}</p></li>
         <a href="#" className="btn btn-primary">Place Order</a>
      </div>}
     </div>
    </>
  )
}