import express from 'express';
import mysql from 'mysql2';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// mysql connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pincode_database',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database.. ', err);
  }
  console.log('Connected to database.');
});

app.post('/api/search', async (req, res) => {
    const { type, query } = req.body;
  
    try {
      let apiUrl = '';

      if (type === 'pin') {
        apiUrl = `https://api.postalpincode.in/pincode/${query}`;
      } else if (type === 'branch') {
        apiUrl = `https://api.postalpincode.in/postoffice/${query}`;
      }
  
      const response = await axios.get(apiUrl);
  
      res.json(response.data);
    } catch (e) {
      console.error('Error fetching data..', e);
      res.status(500).json({ message: 'Error fetching data..' });
    }
  });

  //mark favorite
  app.post('/api/favorite', (req, res) => {
  const { pincode, name, branchType, deliveryStatus, district, region, state } = req.body;
  const query = `INSERT INTO favorites (pincode, name, branch_type, delivery_status, district, region, state)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [pincode, name, branchType, deliveryStatus, district, region, state], (err, result) => {
    if (err) {
      console.error('Error saving data', err);
      return res.status(500).json({ message: 'Error saving data.' });
    }
    res.json({ message: 'Favorite added successfully', id: result.insertId });
  });
});

app.get('/api/favorites', (req, res) => {
  const query = 'SELECT * FROM favorites';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data', err);
      return res.status(500).json({ message: 'Error fetching data.' });
    }
    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
