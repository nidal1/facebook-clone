import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import { useSelector } from 'react-redux';
import { onAuthStateChanged, auth } from './firebase';
import { useDispatch } from 'react-redux';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsc = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }));
      } else {
        dispatch(logout());
      }
    })

    return () => {
      return unsc;
    }
  }, [dispatch])
  return (
    <div className="app">
      {/* Header */}
      <Header />

      {
        !user ? (
          <Login />
        ) : (
          <div className="app__body">
            {/* Sidebar */}
            <Sidebar />
            {/* Feed */}
            <Feed />
            {/* Widgets */}
            <Widgets />

          </div>
        )
      }


      

    </div >
  );
}

export default App;
