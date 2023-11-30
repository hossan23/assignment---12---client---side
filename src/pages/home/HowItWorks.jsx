const HowItWorks = () => {
 return (
  <section className="bg-gray-100 py-12 px-8 my-20">
   <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8 text-gray-800">How It Works</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="rounded-full bg-[#155E75] text-white w-12 h-12 flex items-center justify-center mb-4 mx-auto">1</div>
      <h3 className="text-xl font-semibold mb-2">Explore Available Surveys</h3>
      <p className="text-gray-700">Browse through our list of surveys covering a variety of interesting topics.</p>
     </div>
     <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="rounded-full bg-[#155E75] text-white w-12 h-12 flex items-center justify-center mb-4 mx-auto">2</div>
      <h3 className="text-xl font-semibold mb-2">Select a Survey</h3>
      <p className="text-gray-700">Choose a survey that piques your interest. Check out details like title, description, and category.</p>
     </div>

     <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="rounded-full bg-[#155E75] text-white w-12 h-12 flex items-center justify-center mb-4 mx-auto">3</div>
      <h3 className="text-xl font-semibold mb-2">Navigate to Voting Page</h3>
      <p className="text-gray-700">Click on the Navigate to Voting Page button to start casting your votes on survey questions.</p>
     </div>

     {/* Repeat the pattern for the remaining steps */}
    </div>
   </div>
  </section>
 );
};

export default HowItWorks;
