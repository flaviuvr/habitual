import React from 'react';
import './App.css';

//import HabitList from './components/HabitList.js';
import SignIn from './components/SignIn.js';
import SignOut from './components/SignOut.js';
import HabitList from './components/HabitList.js';
import FirebaseConfig from './FirebaseConfig.js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

//initializes the registered app from firebase with the given config
firebase.initializeApp(FirebaseConfig())

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, loading] = useAuthState(auth);
  var userID = null;
  
  if(user && !loading) {
    userID = user.uid;
  }

  return (
    <div className="App">
      <header className="App-header font-serif text-7xl font-extrabold text-green-500">
        Habitual
      </header>
      <div className="font-semibold text-lg text-grey-700">
        Smaller steps towards a better you.
      </div>

      <section>
        {user && !loading ? (
          <div>
          <HabitList 
          
          user={user} 
          uid={userID} 
          db={db}

          />
          </div>
        ) : (
          <SignIn auth={auth}/>
        )}
      </section>
      <SignOut user={auth.currentUser} action={() => auth.signOut()} />
    </div>
  );
}

export default App;
