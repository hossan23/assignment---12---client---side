import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between my-2 sm:my-4 md:my-6 lg:my-8 items-center">
      <div className="space-y-2 text-center md:text-start mb-2 md:mb-0 px-5">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
          Make Your Voice<br></br> Heard!
        </h1>
        <p className="opacity-80">
          Welcome to our survey website, where your opinions truly matter. We
          believe in the<br></br> power of collective voices to drive change,
          shape industries,<br></br> and influence decisions.
        </p>
        <Link to="/dashboard/survey-creation" className="btn btn-info">
          Sign up free
        </Link>
      </div>
      <img src="hero-survey.png" alt="" className="w-1/2" />
    </section>
  );
};

export default Hero;
