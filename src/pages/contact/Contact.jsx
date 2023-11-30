const Contact = () => {
 return (
  <section className="bg-gradient-to-l from-teal-500 to-cyan-500 py-16 px-8 text-white my-10">
   <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
    <p className="text-lg leading-relaxed mb-8">Have questions, suggestions, or just want to say hello? We would love to hear from you! Reach out to us through the channels below:</p>
    <div className="flex justify-center space-x-4">
     <a href="mailto:info@yoursurveywebsite.com" className="bg-white text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-6 rounded-full transition duration-300">
      Email Us
     </a>
     <a href="https://twitter.com/yourtwitterhandle" target="_blank" rel="noopener noreferrer" className="bg-white text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-6 rounded-full transition duration-300">
      Twitter
     </a>
     <a href="https://www.facebook.com/yourfacebookpage" target="_blank" rel="noopener noreferrer" className="bg-white text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-6 rounded-full transition duration-300">
      Facebook
     </a>
    </div>
   </div>
  </section>
 );
};

export default Contact;
