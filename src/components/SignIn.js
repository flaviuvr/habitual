import React from 'react';
import firebase from 'firebase/app';


function SignIn(props){
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider);
    }

    return(
        <button 
        onClick={() =>signInWithGoogle() }
        className="border border-green-500"
        >Sign in with Google</button> 
    );
}
export default SignIn;