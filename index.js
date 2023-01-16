const x = require("express");
const app = x();

const bodyParser = require("body-parser");


const https = require("https");

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const session = require("express-session");

app.use(session({
    secret: "secret",
    resave: "false",
    saveUninitialized: true
}));
let vinId;


app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/home.html");
});

app.get("/screen1",(req,res)=>{

const data = JSON.stringify({
  username: 'recruitement@rcteam.com',
  authkey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlY3J1aXRlbWVudEByY3RlYW0uY29tIiwidWlkIjo3Mywicm9sZSI6IkZsZWV0TWFuYWdlciIsImlhdCI6MTY3MzU5MzAzMX0.-G_qYCxTbN5kNXiv6wOOLxmOxMUuNa0Cln1Ho3HbK5s'
});

const options = {
  hostname: 'stagingapi.altigreen.app',
  port: 443,
  path: '/api/customApis/getFleetVehicleInfo',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const request = https.request(options,  (response) => {
  console.log(response.statusCode);

  response.on('data', (d) => {
    // process.stdout.write(d);
    const myData=JSON.parse(d);
    console.log(myData);
    console.log(myData.values[0].vin);
    res.render("screen1",{ans : myData.values});
  });
});

request.on('error', (error) => {
  console.error(error);
  
});
request.write(data);
  request.end();

  
});

app.get("/screen1/screen2",(req,res)=>{
  console.log("We are in /screen1/screen2");
  const data=JSON.stringify({
    username : 'recruitement@rcteam.com',
    authkey  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlY3J1aXRlbWVudEByY3RlYW0uY29tIiwidWlkIjo3Mywicm9sZSI6IkZsZWV0TWFuYWdlciIsImlhdCI6MTY3MzU5MzAzMX0.-G_qYCxTbN5kNXiv6wOOLxmOxMUuNa0Cln1Ho3HbK5s',
   vehicle_ids :  vinId
   
  });
  console.log(req.session.id);
  const options={
    hostname : "stagingapi.altigreen.app",
    port     :  443,
    path     :  '/api/customApis/getVehicleInfo',
    method   :  "POST",
    headers  : {
      'content-Type' : 'application/json',
      'content-Length' : data.length
    }
  }
  const request =https.request(options,(response)=>{
    response.on('data',(d)=>{
      const currData=JSON.parse(d);
      console.log(currData);
      res.render('screen2',{ans : currData.values});
      
    })

  })
  request.on('error',(error)=>{
    throw error;
  })
  request.write(data);
  request.end();

});

app.post('/store-vin-in-session', function(req, res) {
  vinId = req.body.vinId;
  req.session.id = vinId;
  
  console.log("We are in store-in-vin-sesssion");
  console.log(vinId);
  res.send('vinId stored in session.');
});








app.listen(3500, () => {
  console.log("Welcome to the server, Prateek");
})



// url :-   https://stagingapi.altigreen.app/api/customApis/getFleetVehicleInfo

// username :-   recruitement@rcteam.com

// authkey  :-   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlY3J1aXRlbWVudEByY3RlYW0uY29tIiwidWlkIjo3Mywicm9sZSI6IkZsZWV0TWFuYWdlciIsImlhdCI6MTY3MzU5MzAzMX0.-G_qYCxTbN5kNXiv6wOOLxmOxMUuNa0Cln1Ho3HbK5s







