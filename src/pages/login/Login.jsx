import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../firebase/AuthProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const Login = () => {
 const axiosPublic = useAxiosPublic();
 const { signIn, google } = useContext(AuthContext);
 const navigate = useNavigate();
 const location = useLocation();
 const from = location.state?.from.pathname || '/';

 const handleLogin = async e => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;
  try {
   const res = await signIn(email, password);
   console.log(res.data);
   Swal.fire('User Logged In!');
   form.reset();
   navigate(from, { replace: true });
  } catch (error) {
   console.error(error.message);
   Swal.fire({
    icon: 'error',
    title: 'Login Failed',
    text: 'Invalid email or password. Please try again.',
   });
  }
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
      Swal.fire('Logged in!');

      navigate(from, { replace: true });
     })
     .catch(err => console.log(err.message));
   })
   .catch(err => console.log(err.message));
 };
 return (
  <div className="flex justify-center items-center md:mt-20">
   <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
    <div className="mb-8 text-center">
     <h1 className="my-3 text-4xl font-bold">Log In</h1>
     <p className="text-sm text-gray-400">Sign in to access your account</p>
    </div>
    <form onSubmit={handleLogin} className="space-y-6 ng-untouched ng-pristine ng-valid">
     <div className="space-y-4">
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

export default Login;
