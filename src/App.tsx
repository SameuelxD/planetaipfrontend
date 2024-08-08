import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { setUser } from './redux/userSlice';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import './App.css';
import HomePage from './components/pages/HomePage';
import SignInPage from './components/pages/SignInPage';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        dispatch(setUser({
          uid: userFirebase.uid,
          email: userFirebase.email,
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLoginSuccess = (user: User) => {
    console.log('Inicio de sesión exitoso', user);
  };

  return (
    <div>
      {user ? <HomePage /> : <SignInPage onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
