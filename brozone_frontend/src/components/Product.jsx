import { FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { Productcontext } from "../store/product_list_context"


export default function Product({img,brand,detail,rs}){

   const {addtobag , addtowishlist}=  useContext(Productcontext);

    return <>
    <div className="card product-btn" style={{ width: '18rem', margin: 'auto' }}>
        <div>
    <img src={img} className="card-img-top" alt="..."/>
    <FaRegHeart className="logo" onClick={()=>addtowishlist({img,brand,detail,rs})} />
    </div>
  <div className="card-body">
    <h5 className="card-title">{brand}</h5>
    <p className="card-text">{detail}</p>
    <h6>Rs.{rs}<span>(45% OFF)</span></h6>
    <a onClick={()=>{addtobag({img,brand,detail,rs})}} href="#" className="btn btn-primary buton">Add to bag</a>
  </div>
</div>
    </>
}