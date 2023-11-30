import { Button, Label, Select, TextInput } from 'flowbite-react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';
import Swal from 'sweetalert2';

const SurveyCreation = () => {
 const axiosPublic = useAxiosPublic();
 const { user } = useContext(AuthContext);
 const handleCreate = e => {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value;
  const descriptions = form.descriptions.value;
  const category = form.category.value;
  const myData = { title, descriptions, category, yes: 0, no: 0, like: 0, disLike: 0, status: 'pending', creatorEmail: user.email };
  console.log(myData);
  axiosPublic
   .post('/surveys', myData)
   .then(res => {
    Swal.fire('Survey created successfully! Wait for admin to publish it');
    console.log(res.data);
    form.reset();
   })
   .catch(err => console.log(err.message));
 };
 return (
  <form onSubmit={handleCreate}>
   {/* title */}
   <div>
    <div className="mb-2 block">
     <Label htmlFor="small" value="Title" />
    </div>
    <TextInput name="title" id="small" type="text" sizing="sm" />
   </div>
   {/* description */}
   <div>
    <div className="mb-2 block">
     <Label htmlFor="large" value="Descriptions" />
    </div>
    <TextInput name="descriptions" id="large" type="text" sizing="lg" />
   </div>
   {/* category */}
   <div className="max-w-md">
    <div className="mb-2 block">
     <Label htmlFor="countries" value="Select your category" />
    </div>
    <Select id="countries" name="category" required>
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
 );
};

export default SurveyCreation;
