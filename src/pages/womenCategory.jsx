import TopBar from "../components/topbar";
import Header from "../components/header";
import ChooseUs from "../components/chooseus";
import Footer from "../components/footer";
import WomensCollection from "../components/womenscollectionHero";
import WomensProducts from "../components/womensproducts";
import Womensection from "../components/womensection";


const WomenCategory = () => {
  return (
    <div className="bg-white">
        <TopBar/>
        <Header />
        <WomensCollection showHeading={false}/>
        <Womensection />
        <ChooseUs />
        <Footer />
    </div>
  );
};

export default WomenCategory;
