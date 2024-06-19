import React from "react";
import Product from "./Product";

const Men = () => {
  const products = [
    { img: "./public/tshirt.jpeg", brand: "Roadster", detail: "solid polotshirt", rs: "399" },
    { img: "./public/shirts.jpeg", brand: "Highlander", detail: "Casual fit", rs: "799" },
    { img: "./public/jeans.jpeg", brand: "Moda-Rapido", detail: "slim fit", rs: "999" },
    { img: "./public/hoodie.jpeg", brand: "Zara", detail: "regular fit", rs: "699" }
  ];

  return (
    <div className="men-main">
      {products.map((product) => (
        <Product
          img={product.img}
          brand={product.brand}
          detail={product.detail}
          rs={product.rs}
        />
      ))}
    </div>
  );
};

export default Men;
