import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between my-2 sm:my-4 md:my-6 lg:my-8 items-center">
      <div className="space-y-2 text-center md:text-start mb-2 md:mb-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
          Make Your Voice Heard!
        </h1>
        <p className="">
          Welcome to our survey website, where your opinions truly matter. We
          believe in the power of collective voices to drive change, shape
          industries, and influence decisions. Whether you're passionate about
          products, policies, or preferences, this platform is your opportunity
          to express yourself and contribute to meaningful discussions. Your
          feedback helps businesses understand their customers better,
          policymakers gauge public sentiment, and communities address pressing
          issues. Join us in making a difference, one survey response at a time.
          Together, let's amplify your voice and shape the future.
        </p>
        <Link to="/dashboard/survey-creation" className="btn btn-primary">
          Start Surveying
        </Link>
      </div>
      <div className="">
        <img src="hero-survey.png" alt="" className="" />
      </div>
    </section>
  );
};

export default Hero;
