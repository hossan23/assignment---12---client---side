import FaqSection from './FaqSection';
import HowItWorks from './HowItWorks';
import LatestSurveys from './LatestSurveys';
import Testimonials from './Testimonials';

const Home = () => {
 return (
  <div>
   <LatestSurveys></LatestSurveys>
   <HowItWorks></HowItWorks>
   <FaqSection></FaqSection>
   <Testimonials></Testimonials>
  </div>
 );
};

export default Home;
