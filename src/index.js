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

app.post("/account", (request,response) =>{
    const { userName, email, password, } = request.body

    if(!userName){
        return response.status(400).json({"user": "not found"});
    }else if(!email){
        return response.status(400).json({"email": "not found"});
    }else if(!password){
        return response.status(400).json({"password": "not found"});
    }

    const user = users.find((user) => user.email === email);

    if(!user){
        users.push({
            userName,
            email,
            password,
            ID: uuidv4(),
        });
    
        return response.status(201).send();
    }

    return response.status(400).json({ error: "user already created" })

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

    const index = resp.findIndex(user => user.userName === name);

    return response.status(201).send(resp[index]); 
})

app.put("/account", verifyUser, (request,response) =>{
    const { email } = request.headers;
    const { name } = request.body;

    const user = users.find((user) => user.email === email);

    user.userName = name;

    return response.status(201).send(user)
})

app.delete("/account" ,verifyUser, (request, response) =>{
    const { email } = request.headers;

    const index = users.findIndex(user => user.email === email);


    users.splice(index, 1);

    return response.status(200).send(users);
})

app.listen(8000);