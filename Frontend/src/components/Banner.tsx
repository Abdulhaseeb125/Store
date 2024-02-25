import { useState } from "react";
import "#/css/SlideBox.css"; // Import CSS file for styling
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/images/1688837161420.png",
    "/images/poster.jpg",
    "/images/headphones.jpg",
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className=" slide-box rounded-md shadow h-48 md:h-64 ">
      <div
        className="slides-container"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 0.5s ease",
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide bg-yellow-200 h-48 md:h-64">
            <img src={slide} alt={`Image-${index}`}   />
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="next-button" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
