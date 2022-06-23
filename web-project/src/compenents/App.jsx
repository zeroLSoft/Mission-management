import React, {useState} from 'react';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import UserPage from './userPage';
import AdministratorPage from './AdministratorPage';


function App(){
    
    var clicked = true

    const [page,setPage] = useState(<Login clickLogin = {loginPage} clickSwitch = {switchPage}/>);

    //Choose which user it,Administrator or a normal user
    function loginPage(exist,UserName,level,notes,fullName){
        
        if(exist === true){
            if(level === true){
                setPage(<AdministratorPage
                    userName = {UserName}
                    taskNotes = {notes}
                    FN = {fullName}
                />);
                console.log(notes);
            }else{
                setPage(<UserPage
                    userName = {UserName}
                    taskNotes = {notes}
                    FN = {fullName}
                />);
                console.log(notes);
            }
        }
    }

    //If clicked Register or a User button.
    function switchPage(){
        setPage(clicked ? <Register clickSwitch = {switchPage}/> : <Login clickLogin = {loginPage} clickSwitch = {switchPage} />);
        if(clicked === true)
            clicked = false;
        else 
            clicked = true;
    }

    return <div className= "container">
        <Header/>
        {page}
        
    </div>
}

export default App;
