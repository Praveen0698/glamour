import Expertise from "./components/Expertise";
import Navbar from "./components/common/Navbar";
import Slider from "./components/Slider";
import About from "./components/About";
import Products from "./components/Products";
import Services from "./components/Services";
import Footer from "./components/common/Footer";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <Slider />
      <Expertise />
      <About />
      <Products />
      <Services />
      <Gallery />
      <Footer />
    </div>
  );
}
