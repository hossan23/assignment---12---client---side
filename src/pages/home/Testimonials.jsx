const testimonialsData = [
 {
  id: 1,
  avatar: 'https://i.ibb.co/FxtrhVN/panda.png',
  testimonial: 'I cant express how much your survey platform has transformed the way I gather feedback for my small business. The user-friendly interface and customizable features make creating surveys a breeze. The detailed analytics provide invaluable insights, helping me make informed decisions to improve my products and services. Thank you for simplifying the survey process and making it such a powerful tool for businesses like mine',
  name: 'John Doe',
  position: 'CEO, Company ABC',
 },
 {
  id: 2,
  avatar: 'https://i.ibb.co/4NhML7k/accountant.png',
  testimonial: 'As a student, your survey website has been a game-changer for conducting research. The wide range of question types and the ability to easily share surveys with my classmates have saved me so much time. The real-time response tracking and analysis tools have been crucial for presenting data in a visually appealing way. Its clear that a lot of thought went into creating a platform that meets the needs of researchers. Highly recommended!',
  name: 'David L',
  position: 'Manger, Company kB',
 },
 {
  id: 3,
  avatar: 'https://i.ibb.co/Kys8f2m/footer.png',
  testimonial: 'I"ve used several survey platforms in the past, but yours stands out for its simplicity and effectiveness. Planning events involves understanding the preferences of attendees, and your platform has made collecting that information seamless. The customizable templates and the option to integrate multimedia elements into surveys have allowed me to create engaging forms for event feedback. Your platform has become an essential tool in ensuring our events are not only memorable but also tailored to our audience. Thank you for making my job easier!',
  name: 'Emily H',
  position: 'Student, Aust University',
 },
];

const Testimonials = () => {
 return (
  <section className="bg-gray-100 py-12">
   <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {testimonialsData.map(testimonial => (
      <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
       <img className="mx-auto mb-4 w-20 h-20 rounded-full" src={testimonial.avatar} alt={`${testimonial.name}'s Avatar`} />
       <p className="text-gray-700 mb-4">{testimonial.testimonial}</p>
       <p className="text-lg font-semibold">{testimonial.name}</p>
       <p className="text-sm text-gray-600">{testimonial.position}</p>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default Testimonials;
