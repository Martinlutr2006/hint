const mysql = require("mysql2");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});
db.connect((err) => {
  if (err) {
    console.error("connection failed", +err.stack);
  } else {
    console.log("connection successful");
  }
});
// Register with role
app.post("/api/users/register", (req, res) => {
  const { username, password, role } = req.body;
  db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, password, role],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Username exists or DB error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    }
  );
});

app.post("/api/users/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users  WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (result.length > 0) {
        res.status(200).json({ message: "Login successful", user: result[0] });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }   }
  );
});
// Get all posts
app.get('/api/posts', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a new post (title only)
app.post('/api/posts', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO posts (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, title });
  });
});

// Update a post (title only)
app.put('/api/posts/:id', (req, res) => {
  const { title } = req.body;
  db.query('UPDATE posts SET title = ? WHERE id = ?', [title, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  db.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

app.get('/api/products',(req,res)=>{
  db.query(
    'SELECT * FROM products',(err,result)=>{
      if(err) return res.status(500).json(err);
      res.json(result);
        }
  )
})
app.post('/api/products',(req,res)=>{
  const{productid,productname,productdescription,productprice} = req.body;
  db.query(
    'INSERT INTO products (productname,productprice,productdescription) VALUES(?,?,?)',[productname,productprice,productdescription],(err,result)=>{
      if(err) res.status(500).json(err)
        res.json({message:"product added",id:result.insertId})
    }
  )
})
app.put('/api/products/:id',(req,res)=>{
  const {productname,productprice,productdescription}= req.body;
  const {id} = req.params;
 db.query(
  'UPDATE products SET productname =?, productprice=?, productdescription=? WHERE productid=?',[productname,productprice,productdescription,id],(err)=>{
    if(err)return res.status(500).json(err)
      res.sendStatus(200);
  }
 )
})
app.delete('/api/products/:id',(req,res)=>{
  const{id} = req.params;
  db.query(
    'DELETE FROM products where productid =?',[id],(err)=>{
      if(err) res.status(500).json(err)
        res.sendStatus(200);
    }
  )
})
app.listen(PORT, (req, res) => {
  console.log(`listening to port ${PORT}`);
});
