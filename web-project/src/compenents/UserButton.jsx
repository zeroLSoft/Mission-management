import React from "react";

function UserButton(props){

    function clickUserName(event){
        props.onClickUN(props.userName);
        event.preventDefault();
    }

    return <button onClick={clickUserName} className='buttonPage'>{props.userName}</button>
}

export default UserButton;