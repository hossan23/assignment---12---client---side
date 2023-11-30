import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const UpdateSurvey = () => {
 const { _id, title, descriptions, category } = useLoaderData();
 const axiosPublic = useAxiosPublic();

 const handleCreate = e => {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value;
  const descriptions = form.descriptions.value;
  const category = form.category.value;
  const myData = { title, descriptions, category, status: 'pending', adminFeedback: null };
  console.log(myData);
  axiosPublic
   .put(`/survey/${_id}`, myData)
   .then(res => {
    console.log(res.data);
    form.reset();
   })
   .catch(err => console.log(err.message));
 };
 return (
  <div>
   <h1>Update Survey id : {_id}</h1>
   <form onSubmit={handleCreate}>
    {/* title */}
    <div>
     <div className="mb-2 block">
      <Label htmlFor="small" value="Title" />
     </div>
     <TextInput defaultValue={title} name="title" id="small" type="text" sizing="sm" />
    </div>
    {/* description */}
    <div>
     <div className="mb-2 block">
      <Label htmlFor="large" value="Descriptions" />
     </div>
     <TextInput defaultValue={descriptions} name="descriptions" id="large" type="text" sizing="lg" />
    </div>
    {/* category */}
    <div className="max-w-md">
     <div className="mb-2 block">
      <Label htmlFor="countries" value="Select your category" />
     </div>
     <Select id="countries" name="category" defaultValue={category} required>
      <option value="Technology">Technology</option>
      <option value="Health">Health</option>
      <option value="Education">Education</option>
      <option value="Consumer Preferences">Consumer Preferences</option>
     </Select>
    </div>
    <div className="text-center mt-2">
     <Button color="success" type="submit">
      Success
     </Button>
    </div>
   </form>
  </div>
 );
};

export default UpdateSurvey;
