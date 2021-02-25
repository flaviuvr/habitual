import React from 'react';

function SignOut(props){
    return props.user && (
      <button onClick={props.action}>Sign Out</button>
    )
  }
  

export default SignOut;