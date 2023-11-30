import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Home from './pages/home/Home';
import ErrorPage from './pages/errorPage/ErrorPage';
import Login from './pages/login/Login';
import AuthProvider from './firebase/AuthProvider';
import SurveysPage from './pages/surveysPage/SurveysPage';
import Dashboard from './dashboard-pages/Dashboard';
import SurveyCreation from './dashboard-pages/surveyor/SurveyCreation';
import Register from './pages/register/Register';
import PrivateRoutes from './PrivateRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SurveyDetails from './pages/surveysPage/SurveyDetails';
import ManageUsers from './dashboard-pages/admin/ManageUsers';
import MySurveys from './dashboard-pages/surveyor/MySurveys';
import UpdateSurvey from './dashboard-pages/surveyor/UpdateSurvey';
import ManageSurvey from './dashboard-pages/admin/ManageSurvey';
import ParticipatedSurveys from './dashboard-pages/user/ParticipatedSurveys';
import BecomePro from './pages/becomePro/BecomePro';
import AdminRoutes from './AdminRoutes';
import SurveyResult from './pages/surveysPage/SurveyResult';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Privacy from './pages/privacy&policy/Privacy';

const queryClient = new QueryClient();

const router = createBrowserRouter([
 {
  path: '/',
  element: <Root></Root>,
  errorElement: <ErrorPage></ErrorPage>,
  children: [
   {
    path: '/',
    element: <Home></Home>,
   },
   {
    path: '/become-pro',
    element: (
     <PrivateRoutes>
      <BecomePro></BecomePro>
     </PrivateRoutes>
    ),
   },
   {
    path: '/login',
    element: <Login></Login>,
   },
   {
    path: '/about',
    element: <About></About>,
   },
   {
    path: '/contact',
    element: <Contact></Contact>,
   },
   {
    path: '/privacy',
    element: <Privacy></Privacy>,
   },
   {
    path: '/register',
    element: <Register></Register>,
   },
   {
    path: '/surveys-page',
    element: <SurveysPage></SurveysPage>,
   },
   {
    path: '/surveysDetails/:id',
    element: (
     <PrivateRoutes>
      <SurveyDetails></SurveyDetails>
     </PrivateRoutes>
    ),
    loader: ({ params }) => fetch(`https://assignment-12-server-side-sigma.vercel.app/survey/${params.id}`),
   },
   {
    path: '/surveysResult/:id',
    element: (
     <PrivateRoutes>
      <SurveyResult></SurveyResult>
     </PrivateRoutes>
    ),
    loader: ({ params }) => fetch(`https://assignment-12-server-side-sigma.vercel.app/survey/${params.id}`),
   },
  ],
 },
 {
  path: 'dashboard',
  element: (
   <PrivateRoutes>
    <Dashboard></Dashboard>
   </PrivateRoutes>
  ),
  children: [
   {
    path: 'survey-creation',
    element: (
     <PrivateRoutes>
      <SurveyCreation></SurveyCreation>
     </PrivateRoutes>
    ),
   },
   {
    path: 'my-surveys',
    element: (
     <PrivateRoutes>
      <MySurveys></MySurveys>
     </PrivateRoutes>
    ),
   },
   {
    path: 'update-survey/:id',
    element: (
     <PrivateRoutes>
      <UpdateSurvey></UpdateSurvey>
     </PrivateRoutes>
    ),
    loader: ({ params }) => fetch(`https://assignment-12-server-side-sigma.vercel.app/survey/${params.id}`),
   },
   {
    path: 'manage-users',
    element: (
     <AdminRoutes>
      <ManageUsers></ManageUsers>
     </AdminRoutes>
    ),
   },
   {
    path: 'manage-survey',
    element: (
     <AdminRoutes>
      <ManageSurvey></ManageSurvey>
     </AdminRoutes>
    ),
   },
   {
    path: 'participated-surveys',
    element: (
     <PrivateRoutes>
      <ParticipatedSurveys></ParticipatedSurveys>
     </PrivateRoutes>
    ),
   },
  ],
 },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <QueryClientProvider client={queryClient}>
   <AuthProvider>
    <RouterProvider router={router} />
   </AuthProvider>
  </QueryClientProvider>
 </React.StrictMode>
);
