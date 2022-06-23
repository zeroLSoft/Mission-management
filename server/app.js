const express = require('express');
const mongoose = require('mongoose');
const userModel = require("./models/users");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("", {
    useNewUrlParser:true
});

//Using at Register component, when adding a new user
app.post('/insert',(req,res)=>{
    const id = req.body.id;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const PhoneNumber = req.body.PhoneNumber;
    const Email = req.body.Email;
    const UserName = req.body.UserName
    const Password = req.body.Password;
    const level = false;

    const user = new userModel({
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        phoneNumber: PhoneNumber,
        userName: UserName,
        password: Password,
        level: level
    });

    try{
        user.save();
        res.send("insert new customer");

    }catch(err){
        console.log(err);
    }
    
})

//Using for add a new task, in the userPage and also in the AdministratorPage components.
app.post('/new_task',(req,res)=>{
    const UserName = req.body.UserName;
    var TaskArray = {
        "title": req.body.Title,
        "content": req.body.Content,
        "checked": false,
        "openDate": req.body.OpenDate,
        "openTime": req.body.OpenTime,
        "whoOpen": req.body.whoOpen
    }

    userModel.findOneAndUpdate(
        { userName:UserName},
        {$push: {taskArray: TaskArray}},(err,docsInserted)=>{
            if(err)
                console.log("err! don't insert to the dataBase")
            else{
                console.log("OK")
                
                // console.log(TaskArray);
            }
        }
    );
    
    userModel.find({userName:UserName},(err,result) =>{
        if(err){
            res.send(err);
        }
        console.log(result);
        res.send(result);
    })
    try{
        // res.send("insert new task");

    }catch(err){
        console.log(err);
    }
    
})

//When click on check at the taskUser Component
app.post('/changeClicked',(req,res)=>{
    const UserName = req.body.UserName;
    const id = req.body.ID;
    const checked = req.body.Checked;
    const title = req.body.Title;
    const content = req.body.Content;

    console.log(checked);
    console.log(id);
    console.log(UserName);
    userModel.updateOne(
        {userName: UserName, "taskArray._id": id},
        {$set: {"taskArray.$.checked": checked}},(err)=>{
            if(err)
                console.log("err! don't insert to the dataBase")
            console.log("OK")
        }
    )
})

//Delete task in the userPage and also at AdministratorPage components.
app.post('/delete_task',(req,res)=>{
    const UserName = req.body.UserName;
    const id = req.body.ID;

    userModel.findOneAndUpdate(
        {userName: UserName},
        {$pull: {taskArray:{_id: id}}},(err)=>{
            if(err)
                console.log("err! don't insert to the dataBase")
            console.log("OK")
        }
    )

    try{
        res.send("task deleted");

    }catch(err){
        console.log(err);
    }

})

app.get('/read_last_element',(req,res)=>{
    const UserName = req.body.UserName;
    userModel.findOne({userName: UserName})

        try{
            res.send("task deleted");
    
        }catch(err){
            console.log(err);
        }
    
})

//get all users at check if some user is already exist and it using for Login and more components for checking.
app.get("/read", async(req,res) =>{
    userModel.find({},(err,result) =>{
        if(err){
            res.send(err);
        }

        res.send(result);
    })
})

app.get("/readSpecificUser",(req,res)=>{
    const UserName = req.body.UserName;
    userModel.find({userName: UserName},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);   
    })
})

app.get("/takeLastNote",(req,res)=>{
    const UserName = req.body.UserName;
    userModel.find( {userName: UserName}, { taskArray: { $slice: -1 } },(err,res)=>{
        if(err){
            res.send(err);
        }
        res.senf(res);
    })
})

app.listen(3001,()=>{
    console.log("Server running on port 3001...");
})