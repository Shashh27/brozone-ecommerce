import { useContext } from "react";
import { IoBagOutline } from "react-icons/io5";
import { Productcontext } from "../store/product_list_context";


export default function Bagicon(){

    const {bagproducts}= useContext(Productcontext)
    return(
        <div className="bag-badge-container position-relative">
      <IoBagOutline className="bag-icon" />
      {bagproducts.length > 0 && (
        <span className="badge position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
          <span className="visually-hidden">New alerts</span>
          {bagproducts.length}
        </span>
      )}
    </div>
    )
}