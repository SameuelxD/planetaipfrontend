import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { setUser } from './redux/userSlice';
import { auth } from './firebase';  // Asegúrate de que esto coincida con la exportación
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import HomePage from './components/pages/HomePage';
import SignInPage from './components/pages/SignInPage';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      dispatch(setUser(userFirebase));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      {user ? <HomePage /> : <SignInPage />}
    </div>
  );
}

export default App;
