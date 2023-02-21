import express from "express";
import mysql2 from "mysql2"
import cors from "cors"
import 'dotenv/config';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// configure MySQL connection settings
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'education'
  });
  
  // establish a connection to the MySQL server
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });


  app.get("/", (req, res) => {
    res.json("hello");
  });
  
  app.get("/education", (req, res) => {
    const q = "SELECT * FROM educationdetails";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  app.post("/education", (req, res) => {

    var startYear= (new Date(req.body.startYear)).toISOString().substring(0,10)
    var endYear = (new Date(req.body.endYear)).toISOString().substring(0,10)

    const q = "INSERT INTO educationdetails(`startYear`, `endYear`, `institutionName`, `courseName`, `specialization`,`award`, `grade`) VALUES (?)";
  
    const values = [
      startYear,
      endYear,
      req.body.institutionName,
      req.body.courseName,
      req.body.specialization,
      req.body.award,
      req.body.grade
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) {console.log(err)
        return res.send(err)};
      console.log(data);  
      return res.json(data);
    });
  });

  const port = process.env.PORT || 8800

  app.listen(port, ()=> {
    console.log(`Backend Connected Succesfully on port ${port}`)
  })
