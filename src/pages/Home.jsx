import React from "react";
import TopBar from "../components/topbar";
import Header from "../components/header";
import Hero from "../components/hero";
import BottomBanner from "../components/bottombanner";
import Footer from "../components/footer";
import FreshPicks from "../components/freshpicks";
import FeaturedCategory from "../components/featuredcategory";
import WomensCollection from "../components/womenscollectionHero";
import WomensProducts from "../components/womensproducts";
import MensCollection from "../components/menscollectionHero";
import MensProducts from "../components/mensproducts";
// import RecommendedProducts from "../components/recommendedProducts";
import PerfectMatch from "../components/perfectmatch";
import CustomerReviews from "../components/customerreviews";
import ChooseUs from "../components/chooseus";

function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <BottomBanner />
      <FreshPicks />
      <FeaturedCategory/>
      <WomensCollection/>
      <WomensProducts/>
      <MensCollection/>
      <MensProducts/>
      {/* <RecommendedProducts/> */}
      <PerfectMatch/>
      <CustomerReviews/>
      <ChooseUs/>
      <Footer />
    </>
  );
}

export default Home;
