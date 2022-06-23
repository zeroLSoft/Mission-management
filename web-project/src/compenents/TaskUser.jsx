import React, {useState} from "react";
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function TaskUser(props) {
    const [customStyle,setCustomStyle] = useState(!props.checked);
    function handleClick() {
        if(props.whoOpen === true){
            setCustomStyle(prevValue=>{
                return !prevValue;
            })
        }
        console.log(props.UN);
        props.onDelete(customStyle,props.id,props.idDel,props.title,props.content,props.whoOpen,props.UN);
    }
    

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(green[100]),
        backgroundColor: green[300],
        '&:hover': {
          backgroundColor: green[700],
        },
      }));

      //Click to open what the task contain.
      function clickOpen(){
          props.onOpen(props.title,props.content);
      }
    return (
        <div style={{background: props.whoOpen ? customStyle ? "white" : "#9EDE73" : customStyle ? "white" : "red" }} className="note">
            <p className="b">{props.date} <br/> {props.time} </p>
            <h1>{props.title}</h1>
        
            {props.whoOpen ? null : <div className="userLogo"><AccountCircleIcon/> <p>User Task</p></div> } 

            <div className={props.whoOpen ?  "divButtonsAd": "divButtons"}>
                <ColorButton varient="outlined" onClick={clickOpen}>Open</ColorButton>
                {props.whoOpen ? <ColorButton variant="outlined" startIcon={<CheckCircleOutline /> } onClick={handleClick}>DONE</ColorButton> : <ColorButton variant="outlined" startIcon={<DeleteIcon /> } onClick={handleClick}>DELETE</ColorButton>}
            </div>
            
        </div>
    );
}

export default TaskUser;
