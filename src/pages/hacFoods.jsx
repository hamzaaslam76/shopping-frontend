import TopBar from "../components/topbar";
import Header from "../components/header";
import ChooseUs from "../components/chooseus";
import Footer from "../components/footer";
import Mensection from "../components/mensection";
import HacFoods from "../components/hacFoodsHero";
import HacSection from "../components/hacfoodsection";

const Category = () => {
  return (
    <div className="bg-white">
        <TopBar/>
        <Header />
        <HacFoods showHeading={false}/>
        <HacSection />
        <ChooseUs />
        <Footer />
    </div>
  );
};

export default Category;
