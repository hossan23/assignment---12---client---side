import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../firebase/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
 const navigate = useNavigate();
 const location = useLocation();
 const from = location.state?.from.pathname || '/';
 const { signUp, updateUserProfile, google } = useContext(AuthContext);
 const axiosPublic = useAxiosPublic();

 const handleRegister = async e => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const photo = form.photo.value;
  const email = form.email.value;
  const password = form.password.value;
  const role = 'user';
  const userInfo = { name, role, email };
  console.log({ name, photo, email, password });
  signUp(email, password)
   .then(res => {
    console.log(res.user);
    updateUserProfile(name, photo)
     .then(res => {
      console.log(res);
      axiosPublic
       .post('/users', userInfo)
       .then(res => {
        console.log(res.data);
        Swal.fire('Account Created!');
        navigate(from, { replace: true });
       })
       .catch(err => console.log(err.message));
      form.reset();
     })
     .catch(err => console.log(err.message));
   })
   .catch(err => console.log(err.message));
 };
 const handleGoogle = () => {
  google()
   .then(res => {
    console.log(res);
    const userInfo = {
     email: res.user?.email,
     name: res.user?.displayName,
     role: 'user',
    };
    axiosPublic
     .post('/users', userInfo)
     .then(res => {
      console.log(res.data);
      Swal.fire('Account Created!');

      navigate(from, { replace: true });
     })
     .catch(err => console.log(err.message));
   })
   .catch(err => console.log(err.message));
 };
 return (
  // <div className="flex justify-center items-center w-full">
  //  {/* <h1 className="text-3xl">register</h1> */}
  //  <form onSubmit={handleRegister} className="flex sm:w-96 flex-col gap-4">
  //   <div>
  //    <div className="mb-2 block">
  //     <Label htmlFor="name1" value="Your name" />
  //    </div>
  //    <TextInput id="name1" type="text" name="name" placeholder="Enter Your Name Here" required />
  //   </div>
  //   <div>
  //    <div className="mb-2 block">
  //     <Label htmlFor="name1" value="Photo URL" />
  //    </div>
  //    <TextInput id="name1" type="text" name="photo" placeholder="Enter Your Photo URL" required />
  //   </div>
  //   <div>
  //    <div className="mb-2 block">
  //     <Label htmlFor="email1" value="Your email" />
  //    </div>
  //    <TextInput id="email1" type="email" name="email" placeholder="Enter Your Email Here" required />
  //   </div>
  //   <div>
  //    <div className="mb-2 block">
  //     <Label htmlFor="password1" value="Your password" />
  //    </div>
  //    <TextInput id="password1" type="password" name="password" required />
  //   </div>

  //   <Button type="submit">Submit</Button>
  //  </form>
  // </div>
  <div className="flex justify-center items-center md:mt-20 mb-10">
   <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
    <div className="mb-8 text-center">
     <h1 className="my-3 text-4xl font-bold">Register</h1>
     <p className="text-sm text-gray-400">Register to create your account</p>
    </div>
    <form onSubmit={handleRegister} className="space-y-6 ng-untouched ng-pristine ng-valid">
     <div className="space-y-4">
      <div>
       <label htmlFor="Name" className="block mb-2 text-sm">
        Name
       </label>
       <input type="text" name="name" id="name" required placeholder="Enter Your Email Here" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900" data-temp-mail-org="0" />
      </div>
      {/* name */}
      <div>
       <label htmlFor="Photo" className="block mb-2 text-sm">
        Photo
       </label>
       <input type="text" name="photo" id="photo" required placeholder="Enter Your photo url" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900" data-temp-mail-org="0" />
      </div>
      {/* photo */}
      <div>
       <label htmlFor="email" className="block mb-2 text-sm">
        Email address
       </label>
       <input type="email" name="email" id="email" required placeholder="Enter Your Email Here" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900" data-temp-mail-org="0" />
      </div>
      <div>
       <div className="flex justify-between">
        <label htmlFor="password" className="text-sm mb-2">
         Password
        </label>
       </div>
       <input type="password" name="password" autoComplete="current-password" id="password" required placeholder="*******" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900" />
      </div>
     </div>

     <div>
      <button type="submit" className="bg-rose-500 w-full rounded-md py-3 text-white">
       Continue
      </button>
     </div>
    </form>

    <div className="flex items-center pt-4 space-x-1">
     <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
     <p className="px-3 text-sm dark:text-gray-400">Login with social accounts</p>
     <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
    </div>
    <Link onClick={handleGoogle}>
     <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
      <FcGoogle size={32} />
      <p>Continue with Google</p>
     </div>
    </Link>
    <p className="px-6 text-sm text-center text-gray-400">
     Don&apos;t have an account yet?{' '}
     <Link to="/register" className="hover:underline hover:text-rose-500 text-gray-600">
      Register
     </Link>
     .
    </p>
   </div>
  </div>
 );
};

export default Register;
