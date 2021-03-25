const {activeUsers} = require('./bot')
const {dreams} = require('./dreams')
const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", (request, response) =>  response.sendFile(__dirname + "/views/index.html"));
app.get("/dreams", (request, response) => response.json(dreams));
app.get("/users", (request, response) => response.json(activeUsers));

const listener = app.listen(process.env.PORT, () => console.log("Your app is listening on port " + listener.address().port));
