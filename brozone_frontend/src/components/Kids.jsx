import React from "react";
import Product from "./Product";

const Kids = () => {
  const products = [
    { id: 21, img: "./public/ktshirt.jpeg", brand: "Jack & Jones", detail: "printed tshirt", rs: "599" },
    { id: 22, img: "./public/kshirt.jpeg", brand: "Ketch", detail: "checks shirts", rs: "499" },
    { id: 23, img: "./public/kjeans.jpeg", brand: "Levis", detail: "slimfit", rs: "999" },
    { id: 24, img: "./public/ethnic.jpeg", brand: "Sangria", detail: "boys kurta set", rs: "2999" }
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

export default Kids;
