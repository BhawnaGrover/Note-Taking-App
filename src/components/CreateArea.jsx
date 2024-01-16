import React, {useState} from 'react';

function CreateArea(props){
    const [note, setNote] = useState({
        title:"",
        content:""
    });

    let name,value;
    const handleChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setNote({...note, [name]:value});
    }
    function submitNote(event){
        props.onAdd(note);
        setNote({
            title: "",
            content: "",
        })
        event.preventDefault();
    }
    return(
        <div>
            <form>
                <input name="title" onChange={handleChange} value={note.title} placeholder="Title"></input>
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={note.content} 
                    placeholder="Take a note...." 
                    rows="3">
                </textarea>
                <button onClick={submitNote}>Add</button>
            </form>
        </div>
    )
}
export default CreateArea;
