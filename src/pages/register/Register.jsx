import { Button, Label, TextInput } from 'flowbite-react';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';
const Register = () => {
 const { signUp, updateUserProfile } = useContext(AuthContext);
 const handleRegister = async e => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const photo = form.photo.value;
  const email = form.email.value;
  const password = form.password.value;
  signUp(email, password)
   .then(res => {
    console.log(res.user);
    updateUserProfile(name, photo)
     .then(form.reset())
     .catch(err => console.log(err.message));
   })
   .catch(err => console.log(err.message));
 };
 return (
  <div className="flex justify-center items-center w-full">
   {/* <h1 className="text-3xl">register</h1> */}
   <form onSubmit={handleRegister} className="flex sm:w-96 flex-col gap-4">
    <div>
     <div className="mb-2 block">
      <Label htmlFor="name1" value="Your name" />
     </div>
     <TextInput id="name1" type="text" name="name" placeholder="Enter Your Name Here" required />
    </div>
    <div>
     <div className="mb-2 block">
      <Label htmlFor="name1" value="Photo URL" />
     </div>
     <TextInput id="name1" type="text" name="photo" placeholder="Enter Your Photo URL" required />
    </div>
    <div>
     <div className="mb-2 block">
      <Label htmlFor="email1" value="Your email" />
     </div>
     <TextInput id="email1" type="email" name="email" placeholder="Enter Your Email Here" required />
    </div>
    <div>
     <div className="mb-2 block">
      <Label htmlFor="password1" value="Your password" />
     </div>
     <TextInput id="password1" type="password" name="password" required />
    </div>

    <Button type="submit">Submit</Button>
   </form>
  </div>
 );
};

export default Register;
