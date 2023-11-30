import { Accordion } from 'flowbite-react';

const FaqSection = () => {
 return (
  <Accordion collapseAll className="my-20">
   <h1 className="text-3xl text-center font-semibold my-4">FaQ Section</h1>
   <Accordion.Panel>
    <Accordion.Title>How do I participate in a survey?</Accordion.Title>
    <Accordion.Content>
     <p className="mb-2 text-gray-500 dark:text-gray-400">To participate in a survey, simply browse through the available surveys on our platform, choose the one you are interested in, and click on the Navigate to Voting Page button. Follow the instructions on the voting page to cast your vote and share your opinions.</p>
    </Accordion.Content>
   </Accordion.Panel>
   <Accordion.Panel>
    <Accordion.Title>Can I change my vote after submitting it?</Accordion.Title>
    <Accordion.Content>
     <p className="mb-2 text-gray-500 dark:text-gray-400">Once you have submitted your vote, it cannot be changed. Make sure to review your choices carefully before confirming your vote. We value the integrity of the survey process and aim to accurately capture participants initial responses.</p>
    </Accordion.Content>
   </Accordion.Panel>
   <Accordion.Panel>
    <Accordion.Title>How are survey results calculated?</Accordion.Title>
    <Accordion.Content>
     <p className="mb-2 text-gray-500 dark:text-gray-400">Survey results are calculated based on the total number of yes and no votes received for each question. The percentage of yes and no votes is then determined in relation to the overall number of participants. Results are updated in real-time and can be viewed on the survey details page.</p>
    </Accordion.Content>
   </Accordion.Panel>
  </Accordion>
 );
};

export default FaqSection;
