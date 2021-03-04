import React from 'react';

function Habit(props){
    
    const editHabit = () => {
            console.log("Habit updated");
    }

    const removeHabit = () => {
        console.log("Habit removed");
    }

    return (
      <div>
        {props.label} {props.text} 
        <input type="checkbox" value={props.check} />
        <button onClick={() => editHabit()}>Edit</button>
        <button onClick={() => removeHabit()}>Remove</button>
      </div>
    );
}
export default Habit;