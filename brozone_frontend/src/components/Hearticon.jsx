import { FaRegHeart } from "react-icons/fa";


import { useContext } from "react"
import { Productcontext } from "../store/product_list_context"

export default function Hearticon(){

   const {wishproducts}=  useContext(Productcontext)
    return(
        <div className="heart-badge-container position-relative">
        <FaRegHeart className="heart-icon" />
        {wishproducts.length > 0 && (
          <span className="badge position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
            {wishproducts.length}
          </span>
        )}
      </div>
    )
}