import React from 'react';
import Navbar from './components/Navbar';
import SecondaryNavbar from './components/SecondaryNavbar';
import BannerSlider from './components/BannerSlider';
import BestProducts from './components/BestProducts';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SecondaryNavbar />
      <main className="flex-1">
        <BannerSlider />
        <BestProducts />
        <Testimonials />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default App;
