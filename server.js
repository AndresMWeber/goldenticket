const {activeUsers} = require('./bot')
const {dreams} = require('./dreams')
const express = require("express");
const app = express();


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  console.log(dreams)
  response.json(dreams);
});

// send the default array of dreams to the webpage
app.get("/users", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(activeUsers);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
