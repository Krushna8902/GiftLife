const express = require("express")
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "donation",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

app.use(express.static(path.join(__dirname, "assets")));

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, "index.html"));  
});

app.post('/register', (req, res) => {
  
    const fullname = req.body.fullname;
    const mobile=req.body.mobile;
    const mail=req.body.email;
    const address=req.body.address;
    const gender=req.body.gender;
    const profession=req.body.profession;
   
    console.log(mobile);
    console.log(mail);
    const sql = `INSERT INTO register (FullName, Mobile , Email , Address, Gender, Profession) VALUES ('${fullname}','${mobile}', '${mail}', '${address}','${gender}', '${profession}')`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send("Error registering user");
        throw err;
      }
      // Send success message as response
      res.send("User Registered Sucessfully")
    })
});

app.post('/success', (req, res) => {
  const location = req.body.location;
  const sql = "SELECT Name, Hospital_Name, Mobile, Location FROM records WHERE Location = ?";
  db.query(sql, [location], (err, result) => {
      if (err) {
          res.status(500).send("Error fetching data from the database");
          throw err;
      }
      res.render('success', { data: result }); 
  });
});

app.post('/hospitals', (req, res) => {
  const sql = "SELECT Hospital_Name, Mobile, Location FROM hospitals ORDER BY Location  ;"; 
  db.query(sql, (err, result) => {
      if (err) {
          res.status(500).send("Error fetching data from the database");
          throw err;
      }
      res.render('hospitals', { hospital: result }); 
  });
});

app.post('/ngos', (req, res) => {
  const sql = "SELECT NGO_Name, Mobile, Location FROM ngo ORDER BY Location  ;"; 
  db.query(sql, (err, result) => {
      if (err) {
          res.status(500).send("Error fetching data from the database");
          throw err;
      }
      res.render('ngo', { ngo: result });
  });
});

app.post('/healthcare', (req, res) => {
  const sql = "SELECT Name, Mobile, Location FROM healthcare ORDER BY Location  ;"; 
  db.query(sql, (err, result) => {
      if (err) {
          res.status(500).send("Error fetching data from the database");
          throw err;
      }
      res.render('healthcare', { healthcare: result }); 
  });
});

app.post('/medicals', (req, res) => {
  const sql = "SELECT Medical_Name, Mobile, Location FROM medicals ORDER BY Location  ;"; 
  db.query(sql, (err, result) => {
      if (err) {
          res.status(500).send("Error fetching data from the database");
          throw err;
      }
      res.render('medicals', { medicals: result }); 
  });
});

app.post('/ambulance', (req, res) => {
  const sql = "SELECT Service_Name, Mobile, Location FROM ambulance ORDER BY Location  ;"; 
  db.query(sql, (err, result) => {
      if (err) {
          res.status(500).send("Error fetching data from the database");
          throw err;
      }
      res.render('ambulance', { ambulance: result }); 
  });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
}
)
