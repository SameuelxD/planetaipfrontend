import React, { useState, useEffect } from 'react';
import appFirebase from './firebase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <Home userEmail = {user.email} /> : <SignIn />}
    </div>
  );
}

export default App;
