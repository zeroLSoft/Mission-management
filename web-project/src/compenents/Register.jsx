import React, { useState, useEffect } from 'react';
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

function Register(props){
    const [showAlert,setAlert] = useState(null);
    const classes = useStyles();
    const [errorColorFN,setErrorColorFN] = useState({
        colorFN: "green",
        errColor: ""
    });
    const [errorColorLN,setErrorColorLN] = useState({
        colorLN: "green",
        errColor: ""
    });
    const [errorColorPN,setErrorColorPN] = useState({
        colorPN: "green",
        errColor: ""
    });
    const [errorColorE,setErrorColorE] = useState({
        colorE: "green",
        errColor: ""
    });
    const [errorColorUN,setErrorColorUN] = useState({
        colorUN: "green",
        errColor: ""
    });
    const [errorColorP,setErrorColorP] = useState({
        colorP: "green",
        errColor: ""
    });
    const [FirstName , setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    
    const [readList,setReadList] = useState([]);

    useEffect( () =>{
        Axios.get("http://localhost:3001/read").then((response) => {
            setReadList(response.data);
            console.log(response);
        });
    },[]);

    
    const addToList = (event) =>{
        var checkExist = false;

        readList.map((val,key)=>{
            if(val.userName === UserName)
                checkExist = true;
            
            return true;
            
        })

        if(FirstName === "" || LastName === "" || PhoneNumber === "" || Email === "" || UserName === "" || Password ===""){
            if(FirstName === ""){
                const FN = {colorFN: "red",errColor: "Empty first name"}
                setErrorColorFN(FN);
            }
            if(LastName === ""){
                const LN = {colorLN: "red", errColor: "Empty last name"}
                setErrorColorLN(LN);
            }
            if(PhoneNumber === ""){
                const PN = {colorPN: "red", errColor: "Empty phone number"}
                setErrorColorPN(PN);
            }
            if(Email === ""){ 
                const E = {colorE: "red", errColor: "Empty email"}
                setErrorColorE(E);
            }
            if(UserName === ""){
                const UN = {colorUN: "red", errColor: "Empty username"}
                setErrorColorUN(UN);
            }
            if(Password ===""){
                const P = {colorP: "red",errColor: "Empty password"}
                setErrorColorP(P);
            }
        }else if(checkExist === false){
            Axios.post("http://localhost:3001/insert",{
                FirstName: FirstName,
                LastName: LastName,
                PhoneNumber: PhoneNumber,
                Email: Email,
                UserName: UserName,
                Password: Password,
                
            });  
            setAlert(<Alert severity="success">new customer added, refresh the page or click login.</Alert>)
            console.log(readList);
        }else{
            setAlert(<Alert severity="error">There is already the same username.</Alert>);
        }
        event.preventDefault();
    };

    return   <div>

                <h1 className='h1Register'>Create youre Task Management account</h1>

                <form className='registerForm'>
                    {showAlert}

                    <h1>Register</h1>

                    <TextField onChange = {(event) =>{
                        setFirstName(event.target.value);
                    }}
                    type = "text" InputLabelProps={{style:{color:errorColorFN.colorFN}}} helperText={errorColorFN.errColor} className = {classes.root} label="First Name" variant="outlined" required/>

                    <TextField onChange = {(event) =>{
                        setLastName(event.target.value);
                    }}
                    type = "text" InputLabelProps={{style:{color:errorColorLN.colorLN}}} helperText={errorColorLN.errColor} className = {classes.root} label="Last Name" variant="outlined" required/>

                    <TextField onChange = {(event) =>{
                        setPhoneNumber(event.target.value);
                    }}
                    type = "text" InputLabelProps={{style:{color:errorColorPN.colorPN}}} helperText={errorColorPN.errColor} className = {classes.root} label="Phone Number" variant="outlined" required/>

                    <TextField onChange = {(event) =>{
                        setEmail(event.target.value);
                    }}
                    type = "email" InputLabelProps={{style:{color:errorColorE.colorE}}} helperText={errorColorE.errColor} className = {classes.root} label="Email" variant="outlined" required/>

                    <TextField onChange = {(event) =>{
                        setUserName(event.target.value);
                    }}
                    type = "text" InputLabelProps={{style:{color:errorColorUN.colorUN}}} helperText={errorColorUN.errColor} className = {classes.root} label="Username" variant="outlined" required/>

                    <TextField onChange = {(event) =>{
                        setPassword(event.target.value);
                    }} 
                    type = "Password" InputLabelProps={{style:{color:errorColorP.colorP}}} helperText={errorColorP.errColor} className = {classes.root} label="Password" variant="outlined" required/>

                    <button className = "buttonPage" onClick = {addToList}>Register</button>
                    <button className = "buttonPage" onClick = {props.clickSwitch}>Login</button>

                </form>

            </div>
    
                
}

export default Register;