const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

const users = []

function verifyUser(request, response, next){
    const { email, password } = request.headers;

    const userEmail = users.find((userEmail) => userEmail.email === email)

    if(!userEmail){
        return response.status(400).json({ error: "Email not found" })
    }

    const userPassword = users.find((userPassword) => userPassword.password === password)

    if(!userPassword){
        return response.status(400).json({ error: "Wrong password" })
    }
    request.userEmail = userEmail;
    return next();
}

app.get("/", (request, response) =>{
    return response.status(200).json({"check": "Hellow world !"})
});

app.post("/account", (request,response) =>{
    const { userName, email, password, } = request.body

    users.push({
        userName,
        email,
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

    const resp = users.map(userExibition => ({
        userName: userExibition.userName,
        email: userExibition.email,
        ID: userExibition.ID
    }));
    return response.status(201).send(resp); 
})

app.listen(8000);
