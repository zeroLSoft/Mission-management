import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { TextField } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import UserButton from './UserButton';
import Alert from '@material-ui/lab/Alert';



  


const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#97BFB4"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#97BFB4"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#97BFB4"
      },
      margin: '10px'
    }
  });

function SearchUser(props){
    const [alertMsg,setAlert] = useState(null);
    const classes = useStyles();
    const [readList,setReadList] = useState([]);
    const [UserName, setUserName] = useState("");
    const notes = [];

    useEffect( () =>{
        Axios.get("http://localhost:3001/read").then((response) => {
            setReadList(response.data);
            console.log(response);
        });
    },[]);

    //Searching a user.
    function searchUserName(userName){
        readList.map((val,key)=>{
            if(val.userName === userName && val.level === false){
                val.taskArray.map((val,key)=>{
                    notes.push(val);
                    return true;
                })
                props.onSearch(notes,userName,false);
            }
            return true;
        })
        console.log(notes);
    }

    //When writing a name of a user name and search him.
    function searchUserNameByWrite(event){
      var checkExist = false;
        readList.map((val,key)=>{
            if(val.userName === UserName && val.level === false){
                
                checkExist = true;
                val.taskArray.map((val,key)=>{
                    notes.push(val);
                    return true;
                })
                props.onSearch(notes,UserName,false);
            }
            return true;
        })

        if(checkExist === false){
          setAlert(<Alert severity="error">This username doesn't exist!</Alert>)
        }
        console.log(notes);
        event.preventDefault();
    }

    return <div>
            <form className='searchUserForm'>
              <h1>Click on user</h1>

              <div className='divSearch'>
                    {alertMsg}
                    <TextField InputLabelProps={{style:{color:'green'}}} className = {classes.root} label="Search User" variant="outlined" onChange = {(event) =>{
                      setUserName(event.target.value);
                     }}/>
                     <button className='buttonSearch' onClick={searchUserNameByWrite}>Search</button>
              </div>
              

              
              
              <div className='divScrollBar'>
                {readList.map((val,key)=>{
                  if(val.level !== true){
                    return (
                      <UserButton
                        key={key}
                        userName={val.userName}
                        onClickUN={searchUserName}
                      />
                     );
                   }
                   return true;
                })}
              </div>
              
              
              
            </form>
    </div>
}

export default SearchUser;