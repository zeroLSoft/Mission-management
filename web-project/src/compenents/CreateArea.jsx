import React, { useState } from "react";
import { TextField } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#97BFB4"
    },
    "&:hover .MuiFilledInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#97BFB4"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#97BFB4"
    },
    width: '300px'
  }
});

var date = new Date();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date.getFullYear();
date = mm + '/' + dd + '/' + yyyy;

var time = new Date();
var hour = String(time.getHours());
var minutes = String(time.getMinutes());
time = hour + ':' + minutes;
function CreateArea(props) {
  const classes = useStyles();
  const [note, setNote] = useState({
    title: "",
    content: "",
    _id: "",
    checked: false,
    openDate: date,
    openTime: time,
    whoOpen: true
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note,date,time);
    console.log(note._id);
    setNote({
      title: "",
      content: "",
      _id: "",
      checked: false,
      openDate: "",
      openTime: "",
      whoOpen:true
    });
    event.preventDefault();
  }

  function newSearch(event){
    props.onNewSearch();

    event.preventDefault();
  }

  return (
    <div>
      <form>
        <TextField inputProps={{maxLength:12}} className = "formPageInput"
          name="title"
          onChange={handleChange}
          value={note.title}
          InputLabelProps={{style:{color:'green'}}} className = {classes.root} label="Title" variant="standard"
        />
        <textarea rows="10" maxLength={500} className = "formPageTextArea"
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button className = "formPagebutton" onClick={submitNote}>Add</button>
        <button className="formSearchbutton" onClick={newSearch}>New search</button>
      </form>
    </div>
  );
}

export default CreateArea;
