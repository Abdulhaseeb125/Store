import { Car, DollarSign, Dumbbell, HeartPulse, Pizza } from "lucide-react";
import { useState } from "react";

export default function CategoryPanel() {
  const [hoveredCategoryName, setHoveredCategoryName] = useState(null);
  const categories = [
    {
      name: "Food",
      icon: <Pizza size={16} />,
      sub: ["Pizza", "Burger", "Shuwarma"],
    },
    {
      name: "Health",
      icon: <HeartPulse size={16} />,
      sub: ["Salad", "Smoothie", "Grilled Chicken"],
    },
    {
      name: "Finance",
      icon: <DollarSign size={16} />,
      sub: ["Investing", "Budgeting", "Savings"],
    },
    {
      name: "Fitness",
      icon: <Dumbbell size={16} />,
      sub: ["Yoga", "Running", "Weightlifting"],
    },
    {
      name: "Travel",
      icon: <Car size={16} />,
      sub: ["Beach", "Mountains", "City Breaks"],
    },
  ];

  function handleMouseEnter(categoryName: any) {
    setHoveredCategoryName(categoryName);
  }

  function handleMouseOut() {
    setHoveredCategoryName(null);
  }

  return (
    <div className="hidden md:block">
      <div className="w-48 h-64 border rounded dark:bg-neutral-900 bg-neutral-100 shadow-md dark:shadow-sm dark:shadow-neutral-900 py-1">
        <ul>
          {categories.map((category) => (
            <li
              key={category.name}
              value={category.name}
              onMouseEnter={() => handleMouseEnter(category.name)}
              onMouseLeave={handleMouseOut}
              className="relative flex items-center gap-2 cursor-pointer px-3 hover:dark:bg-neutral-800  hover:bg-neutral-200  "
            >
              {category.icon}
              {category.name}
              {hoveredCategoryName === category.name &&
                category.sub.length > 0 && (
                  <div className="z-50 absolute -right-[192px] w-48 top-0">
                    <ul className="py-1 shadow-md rounded border mx-2 dark:bg-neutral-900 bg-white">
                      {category.sub.map((subCategory) => (
                        <li
                          key={subCategory}
                          className=" hover:dark:bg-neutral-800  hover:bg-neutral-200 "
                        >
                          <a href="" className="block px-2">
                            {subCategory}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
