import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true,
    cssEase: 'ease-in-out',
  };

  const slides = [
    { 
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
      title: "Mega Sale Event",
      subtitle: "Up to 70% Off",
      description: "Electronics & Gadgets",
      badge: "LIMITED TIME",
      badgeColor: "red"
    },
    { 
      src: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
      title: "New Arrivals",
      subtitle: "Latest Tech",
      description: "Smartphones & Laptops",
      badge: "NEW",
      badgeColor: "green"
    },
    { 
      src: "https://images.unsplash.com/photo-1607082318824-0e96ed7c3fe2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
      title: "Flash Deals",
      subtitle: "Lightning Fast",
      description: "Grab Before Gone",
      badge: "HOT",
      badgeColor: "orange"
    },
  ];

  return (
    <div className="container mx-auto mt-2">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[50vh] md:h-[70vh]">

        {/* Main Slider */}
        <div className="lg:col-span-3 h-full relative">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="relative">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-[50vh] md:h-[70vh] object-cover rounded-xl"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent rounded-xl">
                  <div className="absolute inset-0 flex items-center">
                    <div className="px-8 md:px-12 lg:px-16 w-full lg:w-3/4">
                      {/* Badge */}
                      <div className="mb-4">
                        <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                          slide.badgeColor === 'red' ? 'bg-green-600 text-white' :
                          slide.badgeColor === 'green' ? 'bg-green-700 text-white' :
                          'bg-green-500 text-white'
                        }`}>
                          {slide.badge}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                        {slide.title}
                      </h1>
                      
                      {/* Subtitle */}
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-3">
                        {slide.subtitle}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-base md:text-lg text-white/90 mb-6 max-w-md">
                        {slide.description}
                      </p>
                      
                      {/* CTA Button */}
                      <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Right Side Static Banner */}
        <div className="hidden lg:block h-full">
          <div className="relative h-full group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Side Banner"
              className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-300"
            />
            
            {/* Side Banner Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-600/80 to-green-700/80 rounded-xl flex flex-col justify-center items-center text-white p-6">
              <div className="text-center">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Exclusive
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Premium Collection
                </h3>
                <p className="text-sm md:text-base mb-4 text-white/90">
                  Luxury Items
                </p>
                <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSlider;
