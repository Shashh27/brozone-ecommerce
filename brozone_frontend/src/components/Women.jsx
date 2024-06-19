import React from "react";
import Product from "./Product";

const Women = () => {
  const products = [
    { id: 11, img: "./public/kurtas.jpeg", brand: "KALINI", detail: "kurta with trousers", rs: "1199" },
    { id: 12, img: "./public/saree.jpeg", brand: "Sangria", detail: "silk blend", rs: "2499" },
    { id: 13, img: "./public/tops.jpeg", brand: "H&M", detail: "slimfit", rs: "799" },
    { id: 14, img: "./public/skirts.jpeg", brand: "Zara", detail: "regular fit", rs: "1799" }
  ];

  return (
    <div className="men-main">
      {products.map((product) => (
        <Product
          key={product.id}  // Unique key for React
          id={product.id}   // Unique id prop for each product
          img={product.img}
          brand={product.brand}
          detail={product.detail}
          rs={product.rs}
        />
      ))}
    </div>
  );
};

export default Women;
