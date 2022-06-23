import React from "react";
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { green } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Task(props) {
  const customStyle = !props.checked;
  function handleClick() {
    props.onDelete(props.id,props.idDel);
  }

  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[100]),
    backgroundColor: green[300],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));

  //Click and open what the note contain.
  function clickOpen(){
    props.onOpen(props.title,props.content);
  }
  return (
    <div style={{background: props.whoOpen ? (customStyle ? "white" : "#9EDE73") : "#FFF1BD"}} className="note">
      <p className="b">{props.date} <br/> {props.time} </p>
      <h1>{props.title}</h1>
      {props.whoOpen ? null : <div className="userLogo"><AccountCircleIcon/> <p>User Task</p></div>} 
      <div className={props.whoOpen ?  "divButtonsAd": "divButtons"}>
        <ColorButton varient="outlined" onClick={clickOpen}>Open</ColorButton>
        {props.whoOpen ? <ColorButton variant="outlined" startIcon={<DeleteIcon /> } onClick={handleClick}>DELETE</ColorButton> : null}
      </div>
      
    </div>
  );
}

export default Task;
