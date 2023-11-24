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
import SurveyCreation from './dashboard-pages/surveyCreation/SurveyCreation';
import Register from './pages/register/Register';
import PrivateRoutes from './PrivateRoutes';

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
    path: '/login',
    element: <Login></Login>,
   },
   {
    path: '/register',
    element: <Register></Register>,
   },
   {
    path: '/surveys-page',
    element: <SurveysPage></SurveysPage>,
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
    element: <SurveyCreation></SurveyCreation>,
   },
  ],
 },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <AuthProvider>
   <RouterProvider router={router} />
  </AuthProvider>
 </React.StrictMode>
);
