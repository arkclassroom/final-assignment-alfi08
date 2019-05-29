const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,"../frontend/")))

// database
const sqlite3  = require('sqlite3').verbose(); 
const db       = new sqlite3.Database(path.join(__dirname,"db.db"));

// Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/index.html"))
})

app.get("/manage", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/manage.html"))    
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/login.html"))    
})

app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/profile.html"))    
})

// Rest Api

// get all items
app.get("/items", (req,res) => {
    const sql = "select * from items"
    
    db.all(sql, (err,data) => {
        if(err) res.json({"error" : err.message})

        res.json(data)
    })
})

app.get("/items/:id", (req,res) => {
    const sql = "select * from items where id = ?"
    const param = req.params.id
    db.get(sql,param, (err,data) => {
        if(err) res.json({"error" : err.message})

        res.json(data)
    })
})

app.post("/items", (req,res) => {
    const sql = "insert into items(productName,price,category,stock,createdAt) values(?,?,?,?,?)"
    const params = [req.body.productName, req.body.price, req.body.category, req.body.stock, req.body.createdAt]

    db.run(sql,params, (err,data) => {
        if(err) res.json({"error" : err.message})
        res.json({"message" : "Item added"})
    })
})

app.delete("/items/:id", (req,res) => {
    const sql ="delete from items where id = ?"
    const param = req.params.id

    db.run(sql,param, (err,data) => {
        if(err) res.json({"error" : err.message})
        res.json({"message" : "Item deleted"})
    })
})

app.put("/items/:id", (req,res) => {
    const sql =`update items set 
    productName = ?,
    price = ?, 
    category = ?,
    stock = ?,
    createdAt = ?
    where id = ?`
    const params = [req.body.productName, req.body.price, req.body.category, req.body.stock, req.body.createdAt, req.params.id]

    db.run(sql,params, (err,data) => {
        if(err) res.json({"error" : err.message})

        res.json({"message" : "data edited"})
    })
})

//user
app.get("/users/:email", (req,res) => {
    const sql = "select * from users where email = ?"
    const param = req.params.email

    db.get(sql,param, (err, data)=> {
        if(err) res.json({"error" : err.message})

        res.json(data)
    })
})


// Running server
app.listen(3000, () => console.log("On 3000.."))