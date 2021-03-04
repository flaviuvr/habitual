import React from 'react';
import './App.css';

//import HabitList from './components/HabitList.js';
import SignIn from './components/SignIn.js';
import SignOut from './components/SignOut.js';
import HabitList from './components/HabitList';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';

//initializes the registered app from firebase with the given config
firebase.initializeApp({
  apiKey: "AIzaSyCdtLr53pjpSvOwOfoskZRh6Yr7Y5sNU70",
  authDomain: "habitual-b4c8e.firebaseapp.com",
  projectId: "habitual-b4c8e",
  storageBucket: "habitual-b4c8e.appspot.com",
  messagingSenderId: "433764087571",
  appId: "1:433764087571:web:8e8da2de2ea975ef760ce6"
})

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
      <header className="App-header">
        Habitual
        <SignOut user={auth.currentUser} action={() => auth.signOut()} />
      </header>

      <section>
        {user && !loading ? (

          <div>
          <HabitList user={user} uid={userID} db={db}/>
          </div>
        ) : (
          <SignIn auth={auth}/>
        )}
      </section>
    </div>
  );
}



const removeUser = () => {

}

const removeHabit = () => {

}

const checkHabit = () => {

}




export default App;
