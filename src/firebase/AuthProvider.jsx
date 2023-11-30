import { createContext, useEffect, useState } from 'react';
import { app } from '../../firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const auth = getAuth(app);

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
 const [loading, setLoading] = useState(true);
 const [user, setUser] = useState(null);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, currentUser => {
   setUser(currentUser);
   console.log(currentUser);
   setLoading(false);
  });
  return () => {
   return unsubscribe();
  };
 }, []);

 const signUp = (email, password) => {
  setLoading(true);
  return createUserWithEmailAndPassword(auth, email, password);
 };

 const signIn = (email, password) => {
  setLoading(true);
  return signInWithEmailAndPassword(auth, email, password);
 };

 const updateUserProfile = (name, photo) => {
  //   setLoading(true);
  return updateProfile(auth.currentUser, {
   displayName: name,
   photoURL: photo,
  });
 };

 const google = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider);
 };

 const logOut = () => {
  setLoading(true);
  return signOut(auth);
 };

 const userInfo = { user, loading, signUp, signIn, updateUserProfile, google, logOut };
 return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
