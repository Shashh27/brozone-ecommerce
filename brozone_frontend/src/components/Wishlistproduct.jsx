import { useContext } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { Productcontext } from "../store/product_list_context";

export default function Wishlistproduct({id,img,brand,detail,rs}){
    const {movetobag , deletewish , wishproducts}= useContext(Productcontext)
    return (
        <div className="card product-btn " style={{ width: '18rem', margin: 'auto' }}>
        <div>
    <img src={img} className="card-img-top" alt="..."/>
    <CiSquareRemove onClick={()=>deletewish({wishproducts})}  className="logo"  />
    </div>
  <div className="card-body">
    <h5 className="card-title">{brand}</h5>
    <p className="card-text">{detail}</p>
    <h6>Rs.{rs}<span>(45% OFF)</span></h6>
    <a onClick={()=>movetobag({id,img,brand,detail,rs})}  href="#" className="btn btn-primary">Move to bag</a>
  </div>
</div>
    )
}