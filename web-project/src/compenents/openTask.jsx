import React from "react";

function OpenTask(props){

    function backButton(event){
        props.onBack("","");
    }

    return(
        <div>
            <form className="openTaskForm">
                <h1>{props.title}</h1>
                <div>
                    <textarea readOnly value={props.content}/>
                    <button className="formBackbutton" onClick={backButton}>Back</button>
                </div>
            </form>
        </div>
    );
}

export default OpenTask;