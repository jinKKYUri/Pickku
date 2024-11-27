import Category from '../components/Category';
import Header from '../components/Header';
import Slider from '../components/Slider';

function Home(){
  return (
    <div className="min-w-[1200px]">
      <Header type="main" />
      <Category />
      <Slider />
    </div>
  );
}

export default Home;
