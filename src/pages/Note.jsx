import React from "react";


function Note(notes){
    function handleClick(){
        notes.onDelete(notes.id);
    }
    return (
        <div className="note">
            <h1>{notes.title}</h1>
            <p>{notes.content}</p>
            <button className="deletebtn" onClick={handleClick}>DEL</button>
        </div>
    );
}
export default Note;