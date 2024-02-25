// import React from "react";
// import React from "react";
import ProductCard from "../subComponents/ProductCard";
import TimeCounter from "./TimeCounter";

export default function SalePoint() {
  let items = [
    {
      id: 1,
      src: "/images/shoes.jpg",
      category: "Shoes",
      title: "Attractive shoes for men and women",
      price: "2500",
      extra: "",
    },
    {
      id: 2,
      src: "/images/headphones.jpg",
      category: "headphones",
      title: "headphones for better ears",
      price: "3000",
      extra: "",
    },
    {
      id: 3,
      src: "/images/chair.jpg",
      category: "furneture and wood",
      title: "white beautiful chair made with best wood",
      price: "6000",
      extra: "",
    },
    {
      id: 4,
      src: "/images/health.jpg",
      category: "Health and Beauty",
      title: "Heath cream for better skin",
      price: "2000",
      extra: "",
    },
    {
      id: 5,
      src: "/images/health.jpg",
      category: "Health and Beauty",
      title: "Heath cream for better skin",
      price: "2000",
      extra: "",
    },
    {
      id: 6,
      src: "/images/health.jpg",
      category: "Health and Beauty",
      title: "Heath cream for better skin",
      price: "2000",
      extra: "",
    },
  ];
  return (
    <div>

      <div className="py-3 grid grid-cols-2   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2  ">
        {items.map((i) => (
          <ProductCard
            // key={i.id}
            // image_src={i.src}
            // category={i.category}
            // title={i.title}
            // price={i.price}
            // extra={i.extra}
          />
        ))}
      </div>
    </div>
  );
}
