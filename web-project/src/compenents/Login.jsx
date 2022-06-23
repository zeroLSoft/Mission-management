import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { TextField } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
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

function Login(props){
    const [showAlert,setAlert] = useState(null);
    const classes = useStyles();
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const notes = [];
    let fullName = "";
    

    const [readList,setReadList] = useState([]);

    //Take all users from database.
    useEffect( () =>{
        Axios.get("http://localhost:3001/read").then((response) => {
            setReadList(response.data);
        });
    },[readList]);

    //Check if insert a valid details.
    const checkValidUserNameAndPassword = (event) =>{
        var checkExist = false;
        var level = false;
        console.log(readList);
        readList.map((val,key)=>{
            if(val.userName === UserName && val.password === Password){
                checkExist = true;
                level = val.level;
                val.taskArray.map((val,key)=>{
                    notes.push(val);
                    return true;
                })
                
                console.log(notes);
                fullName = val.firstName + " " + val.lastName;
                console.log(fullName);

            }
            return true;
        })
        
        if(checkExist === false){
            setAlert(<Alert severity="error">Username or password is incorrect</Alert>)
        }else{
            props.clickLogin(true,UserName,level,notes,fullName);
        }
        event.preventDefault();
    }

    

    return <div>
              <h1 className='h1Login'>Welcome back, Lets work!</h1>

              <form className='loginForm'>
                  <h1>Login</h1>
                  {showAlert}
                  <TextField onChange={(event)=>{setUserName(event.target.value)}} InputLabelProps={{style:{color:'green'}}} className = {classes.root} label="User Name" variant="outlined" />
                  <br></br>
                  <TextField onChange = {(event) =>{setPassword(event.target.value);}} InputLabelProps={{style:{color:'green'}}} type="password" className = {classes.root} label="Password" variant="outlined" />
                  
                  <button className = "buttonPage" onClick = {checkValidUserNameAndPassword}>Connect</button>
                  <button className = "buttonPage" onClick = {props.clickSwitch}>Register</button>

                  
              </form>
          </div>
            

}

export default Login;