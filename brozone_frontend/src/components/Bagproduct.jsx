import { PiKeyReturn } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { Productcontext } from "../store/product_list_context";

export default function Bagproduct({ id, img, brand, detail, rs }) {

    const {deletebag , bagproducts}= useContext(Productcontext)
  return (
    <div
      className="card mb-3 bag-product"
      style={{ maxWidth: "500px", height: "200px", position: "relative" }}
    >
      <div className="row g-0" style={{ height: "100%" }}>
        <div className="col-md-4" style={{ height: "100%" }}>
          <img src={img} className="img-fluid rounded-start" alt={brand} style={{ height: "100%", objectFit: "cover" }} />
        </div>
        <div className="col-md-8" style={{ height: "100%" }}>
          <div className="card-body" style={{ height: "100%" }}>
            <div className="d-flex justify-content-between align-items-center brand-row">
              <h3 className="card-title mb-0">{brand}</h3>
              <MdDelete onClick={()=>deletebag({bagproducts})} className="delete-icon" />
            </div>
            <p className="card-text detail-text">{detail}</p>
            <h4 className="card-text">
              <small className="text-body-secondary">
                Rs.{rs} <span>(45% OFF)</span>
              </small>
            </h4>
            <li className="size">
              <p>Size: L</p> <p>Qty: 1</p>
            </li>
            <li className="return">
              <PiKeyReturn className="return-logo" />
              <p>14 days return available</p>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}
