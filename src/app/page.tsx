'use lient'

import Header from "./components/Header";
import Hero from "./components/Hero";
import Feature from "./components/FeatureProduct";
import LatestProducts from "./components/LatestProducts";
import Offers from "./components/Offers";
import Unique from "./components/Unique";
import TrendingProducts from "./components/TrendingProducts";
import Discount from "./components/Discount";
import TopCategories from "./components/TopCategories";
import Newslater from "./components/Newsletterr";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";

function Homepage(){
  return(
    <div>
      <Header />
      <Hero />
      <Feature />
      <LatestProducts />
      <Offers />
      <Unique />
      <TrendingProducts />
      <Discount />
      <TopCategories />
      <Newslater />
      <BlogSection />
      <Footer />
    </div>
  )
}

export default Homepage;