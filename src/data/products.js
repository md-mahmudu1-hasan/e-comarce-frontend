export const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.5,
    image: "/slider.jpeg",
    description: "Premium wireless headphones with noise cancellation and superior sound quality. Experience crystal-clear audio with active noise cancellation technology, 30-hour battery life, and comfortable over-ear design perfect for long listening sessions.",
    stock: 15,
    category: "Electronics",
    brand: "AudioTech",
    reviews: [
      { id: 1, user: "John D.", rating: 5, comment: "Amazing sound quality! The noise cancellation is incredible." },
      { id: 2, user: "Sarah M.", rating: 4, comment: "Great value for money. Comfortable for long use." }
    ]
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    rating: 4.8,
    image: "/slider.jpeg",
    description: "Advanced smartwatch with health monitoring, GPS, and smartphone integration. Track your fitness, receive notifications, and stay connected with this feature-packed smartwatch that combines style with functionality.",
    stock: 8,
    category: "Electronics",
    brand: "TechTime",
    reviews: [
      { id: 3, user: "Mike R.", rating: 5, comment: "Best smartwatch I've ever owned! Battery life is amazing." },
      { id: 4, user: "Lisa K.", rating: 5, comment: "Perfect for fitness tracking. Accurate heart rate monitor." }
    ]
  },
  {
    id: 3,
    title: "Laptop Backpack",
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.3,
    image: "/slider.jpeg",
    description: "Durable laptop backpack with multiple compartments and USB charging port. Protect your laptop with this water-resistant backpack featuring padded compartments, ergonomic design, and built-in USB charging for your devices.",
    stock: 25,
    category: "Accessories",
    brand: "TravelPro",
    reviews: [
      { id: 5, user: "Tom H.", rating: 4, comment: "Very spacious and well-made. Fits my 15-inch laptop perfectly." }
    ]
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.6,
    image: "https://via.placeholder.com/300x300/2d7a2d/ffffff?text=Speaker",
    description: "Portable Bluetooth speaker with 360° sound and waterproof design. Enjoy immersive audio anywhere with this compact speaker that delivers powerful bass, clear highs, and 12-hour battery life.",
    stock: 12,
    category: "Electronics",
    brand: "SoundWave",
    reviews: [
      { id: 6, user: "Emma L.", rating: 5, comment: "Incredible sound quality! Perfect for outdoor parties." },
      { id: 7, user: "David B.", rating: 4, comment: "Great for outdoor use. Waterproof feature is excellent." }
    ]
  },
  {
    id: 5,
    title: "Phone Case",
    price: 499,
    originalPrice: 699,
    discount: 29,
    rating: 4.2,
    image: "https://via.placeholder.com/300x300/2d7a2d/ffffff?text=Phone+Case",
    description: "Protective phone case with military-grade drop protection. Keep your phone safe with this rugged case that offers military-grade protection without adding bulk to your device.",
    stock: 50,
    category: "Accessories",
    brand: "ShieldGuard",
    reviews: [
      { id: 8, user: "Alex P.", rating: 4, comment: "Very durable case. Saved my phone multiple times!" }
    ]
  },
  {
    id: 6,
    title: "Tablet Stand",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.4,
    image: "https://via.placeholder.com/300x300/2d7a2d/ffffff?text=Tablet+Stand",
    description: "Adjustable tablet stand for comfortable viewing angles. Enhance your tablet experience with this ergonomic stand that offers multiple viewing angles and stable support for your device.",
    stock: 18,
    category: "Accessories",
    brand: "ViewPlus",
    reviews: [
      { id: 9, user: "Nina S.", rating: 5, comment: "Perfect for my setup! Very sturdy and adjustable." }
    ]
  },
  {
    id: 7,
    title: "USB Cable",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.1,
    image: "https://via.placeholder.com/300x300/2d7a2d/ffffff?text=USB+Cable",
    description: "High-speed USB-C cable with fast charging support. Charge and sync your devices quickly with this durable cable that supports fast charging and data transfer speeds.",
    stock: 100,
    category: "Accessories",
    brand: "ChargeFast",
    reviews: [
      { id: 10, user: "Ryan M.", rating: 4, comment: "Charges really fast. Good quality cable." }
    ]
  },
  {
    id: 8,
    title: "Power Bank",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.7,
    image: "https://via.placeholder.com/300x300/2d7a2d/ffffff?text=Power+Bank",
    description: "20000mAh power bank with fast charging and multiple ports. Never run out of battery with this high-capacity power bank that can charge multiple devices simultaneously.",
    stock: 22,
    category: "Electronics",
    brand: "PowerMax",
    reviews: [
      { id: 11, user: "Chris W.", rating: 5, comment: "Lasts for days! Can charge my phone 4-5 times." },
      { id: 12, user: "Julia T.", rating: 5, comment: "Lifesaver during travels. Compact and powerful." }
    ]
  },
  {
    id: 9,
    title: "Wireless Mouse",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.5,
    image: "https://via.placeholder.com/300x300/2d7a2d/ffffff?text=Wireless+Mouse",
    description: "Ergonomic wireless mouse with precision tracking. Work comfortably with this ergonomic mouse that offers precise cursor control, long battery life, and customizable buttons.",
    stock: 35,
    category: "Electronics",
    brand: "ClickPro",
    reviews: [
      { id: 13, user: "Steve L.", rating: 5, comment: "Very comfortable to use. Great for long work sessions." }
    ]
  },
  {
    id: 10,
    title: "Keyboard",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.6,
    image: "https://via.placeholder.com/300x300/2d7a2d/ffffff?text=Keyboard",
    description: "Mechanical keyboard with RGB backlighting and programmable keys. Elevate your typing experience with this premium mechanical keyboard featuring tactile switches, customizable RGB lighting, and programmable macro keys.",
    stock: 16,
    category: "Electronics",
    brand: "TypeMaster",
    reviews: [
      { id: 14, user: "Kevin D.", rating: 5, comment: "Amazing typing experience! RGB lighting is fantastic." }
    ]
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};
