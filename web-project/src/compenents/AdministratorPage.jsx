import React, { useState,useEffect } from "react";
import Task from "./Task";
import CreateArea from "./CreateArea";
import SearchUser from "./SearchUser";
import Axios from 'axios';
import { AnimatedList } from "react-animated-list";
import OpenTask from "./openTask";

function AdministratorPage(props) {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [clickedToOpen,setClickToOpen] = useState(false);
  const [component,setComponent] = useState(true);
  const [userNameSearch, setUserNameSearch] = useState("");
  const [notes, setNotes] = useState([]);
  
  var readList2 = [];
  const [newSearch,setNewSearch] = useState("");

  //Check every 3 minutes if there is some update from the database.
  useEffect( () =>{
    const interval = setInterval(()=>{
      Axios.get("http://localhost:3001/read").then(function(response) {
        readList2 = response.data;
        if(response.status >= 200 && response.status <=300){
          readList2.map((val)=>{
            console.log(newSearch);
            if(val.userName === newSearch){
              console.log(val.userName);
                setNotes((val.taskArray.map((noteItem,index)=>{
                  return({title: noteItem.title, content: noteItem.content,checked: noteItem.checked,_id: noteItem._id, openDate: noteItem.openDate, openTime: noteItem.openTime, whoOpen: noteItem.whoOpen});
                 })));
            }
            return true;
          })
        }
      });
     
      
      
    },3000);
    return ()=>{clearInterval(interval);}
  },[notes]);

  //Add new note.
  function addNote(newNote,currentDate,currentTime) {
    if(newNote.title === "" || newNote.content === ""){
      alert("Title or Content of the task are empty");
    }else{
      console.log(currentDate);
      Axios.post("http://localhost:3001/new_task",{
            UserName: userNameSearch,
            Title: newNote.title,
            Content: newNote.content,
            OpenDate: currentDate,
            OpenTime:currentTime,
            whoOpen:true
        }).then(function(response){
          if(response.status >= 200 && response.status <=300){
            var length = response.data[0].taskArray.length;
            console.log(length);
            console.log(response.data[0].taskArray[length-1]);
            setNotes(prevNotes => {
            return [...prevNotes, newNote];
          });
          }
          
        });    
    }
    
  }

  
  //After searching user - return all his notes.
  function returnNotesFromSearch(Snotes,username,existUser){
    setNotes(Snotes);
    setUserNameSearch(username);
    setNewSearch(username);
    setComponent(false);
  }


  //Delete note
  function deleteNote(id,idDel) {
    Axios.post("http://localhost:3001/delete_task",{
            UserName: userNameSearch,
            ID: idDel
        }).then(function(response){
          if(response.status >= 200 && response.status <=300){
            setNotes(prevNotes => {
              return prevNotes.filter((noteItem,index) =>{
                return index !== id;
              })
            })
          }
        });
    
  }
  
  //When click "New search", shows all users again.
  function clickedNewSearch(){
    setComponent(true);
    setNotes([]);
    setNewSearch("");
  }

  //Open task window and see what it contain inside.
  function openTask(title,content){
    setClickToOpen(prevValue =>{
      return !prevValue;
    });
    
    setTitle(title);
    setContent(content);
  }

  return (
    <div>
      <h1 className="hiPage">Hi, {props.FN}</h1>
      <div className="administorPageDiv">
        
        {component ? <SearchUser  allNotes={notes} onSearch={returnNotesFromSearch}/> : <CreateArea onNewSearch={clickedNewSearch} onAdd={addNote} />}
          {/* <SearchUser onSearch={returnNotesFromSearch}/> */}
{/*         
        <Animated animationIn="flipInX" animationInDuration={1000} animationOutDuration={1000} isVisible={visibleSearch}>
          <CreateArea onAdd={addNote} />
        </Animated> */}
      </div>
     {component ? null : clickedToOpen ? <OpenTask onBack={openTask} title={title} content={content}/> : <div className="AllNotesDivs">
        <AnimatedList animation={"grow"}>
          {notes.map((noteItem, index) => {
            return (
              <Task
                key={index}
                id={index}
                idDel = {noteItem._id}
                title={noteItem.title}
                content={noteItem.content}
                checked={noteItem.checked}
                date={noteItem.openDate}
                time = {noteItem.openTime}
                onDelete={deleteNote}
                whoOpen = {noteItem.whoOpen}
                onOpen={openTask}
              />
            );
          })}
        </AnimatedList>
      </div>} 
    </div>
  );
}

export default AdministratorPage;
