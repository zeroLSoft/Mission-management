import React,{useState} from 'react';


function Header(){

    setInterval(updateTime,1000);

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const [time,setTime] = useState(currentTime);
    const[date,setDate] = useState(currentDate);

    function updateTime(){
        const newCurrentTime = new Date().toLocaleTimeString();
        const newCurrentDate = new Date().toLocaleDateString();
        setTime(newCurrentTime);
        setDate(newCurrentDate);
    }

    return <header>
        <h1>Task managemnt</h1>
        <p> {date}|{time} </p>
    </header>
}

export default Header;