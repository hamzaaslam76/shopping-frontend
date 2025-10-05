import TopBar from "../components/topbar";
import Header from "../components/header";
import ChooseUs from "../components/chooseus";
import Footer from "../components/footer";
import Mensection from "../components/mensection";
import MensCollection from "../components/menscollectionHero";


const MenCategory = () => {
  return (
    <div className="bg-white">
        <TopBar/>
        <Header />
        <MensCollection showHeading={false}/>
        <Mensection />
        <ChooseUs />
        <Footer />
    </div>
  );
};

export default MenCategory;
