const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

const users = []

app.get("/", (request, response) =>{
    return response.status(200).json({"check": "Hellow world !"})
});

app.post("/account", (request,response) =>{
    const { userName, password } = request.body

    users.push({
        userName,
        password,
        ID: uuidv4(),
    });

    return response.status(201).send();
});

app.get("/searchUser", (request, response) =>{
    const { name } = request.headers;

    const user = users.find((user) => user.userName === name);
 
    if(!user){
        return response.status(400).json({error: "User not found"})
    }

    return response.status(201).send(user); 
})

app.listen(8000);
