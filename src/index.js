const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (request, response) =>{
    return response.status(200).json({"check": "Hellow world !"})
});

app.listen(8000);
