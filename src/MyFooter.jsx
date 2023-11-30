import { Footer } from 'flowbite-react';

const MyFooter = () => {
 return (
  <Footer container className="bg-slate-200">
   <Footer.Copyright href="#" by="InsightPulse!" year={2023} />
   <Footer.LinkGroup>
    <Footer.Link href="#">Survey Page</Footer.Link>
    <Footer.Link href="#">About us</Footer.Link>
    <Footer.Link href="#">Contact Us</Footer.Link>
    <Footer.Link href="#">Contact</Footer.Link>
   </Footer.LinkGroup>
  </Footer>
 );
};

export default MyFooter;
