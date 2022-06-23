import React,{useState,useEffect} from "react";
import TaskUser from "./TaskUser";
import Axios from 'axios';
import { AnimatedList } from "react-animated-list";
import CreateAreaUser from "./CreateAreaUser";
import OpenTask from "./openTask";

function UserPage(props) {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [clickedToOpen,setClickToOpen] = useState(false);
  const [notes,setNotes] = useState((props.taskNotes.map((noteItem,index)=>{
   return({title: noteItem.title, content: noteItem.content,checked: noteItem.checked,_id: noteItem._id, openDate: noteItem.openDate, openTime: noteItem.openTime, whoOpen: noteItem.whoOpen});
  })));
  var readList2 = [];
  useEffect( () =>{
    setInterval(()=>{
      Axios.get("http://localhost:3001/read/").then(function(response) {
        readList2 = response.data;
        if(response.status >= 200 && response.status <=300){
          readList2.map((val,key)=>{
            if(val.userName === props.userName )
            { 
              if(notes.length !== val.taskArray){
                setNotes((val.taskArray.map((noteItem,index)=>{
                  return({title: noteItem.title, content: noteItem.content,checked: noteItem.checked,_id: noteItem._id, openDate: noteItem.openDate, openTime: noteItem.openTime, whoOpen: noteItem.whoOpen});
                 })));
              }
               
            }
            return null;
          })
        }
      });
      
    },3000);
  },[]);

  //Update the database when the user clicked on the check button.
  function checkedClick(checkFlag,id,idDel,title,content,ifUser,currentUN) {
    //Check if it is a normal user.
    if(ifUser){
      Axios.post("http://localhost:3001/changeClicked",{
            UserName: props.userName,
            ID: idDel,
            Checked: checkFlag,
            Title: title,
            Content: content
        });
    }
    
    //if it is an administrator user.
    if(!ifUser){
      Axios.post("http://localhost:3001/delete_task",{
            UserName: currentUN,
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
  }
  
  //Add new user note.
  async function addNote(newNote,currentDate,currentTime) {
    if(newNote.title === "" || newNote.content === ""){
      alert("Title or Content of the task are empty");
    }else{
      console.log(currentDate);
      Axios.post("http://localhost:3001/new_task",{
            UserName: props.userName,
            Title: newNote.title,
            Content: newNote.content,
            OpenDate: currentDate,
            OpenTime:currentTime,
            whoOpen: false
      }).then(function (response){
        if(response.status >= 200 && response.status <=300){
          var length = response.data[0].taskArray.length;
          console.log(length);
          console.log(response.data[0].taskArray[length-1]);
          setNotes(prevNotes => {
            return [...prevNotes, newNote];
          });
        }
        
      })
      
      console.log(notes.length);
    }
  }

  //Click to open what the note contain.
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
      {notes.length > 0 ? <p></p> : <p className="noTasksYet">Yay! There is no tasks...</p>}
      <CreateAreaUser onAdd={addNote}/>
      </div>
      {clickedToOpen ? <OpenTask onBack={openTask} title={title} content={content}/> : <div className="AllNotesDivs">
          <AnimatedList animation={"grow"}>
            {notes.map((noteItem, index) => {
              return (
                <TaskUser
                  key={index}
                  id={index}
                  UN={props.userName}
                  idDel = {noteItem._id}
                  title={noteItem.title}
                  content={noteItem.content}
                  checked={noteItem.checked}
                  date={noteItem.openDate}
                  time = {noteItem.openTime}
                  onDelete={checkedClick}
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

export default UserPage;
