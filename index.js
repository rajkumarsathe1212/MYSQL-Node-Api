
let express = require("express");
let fs = require("fs");
let bodyparser = require("body-parser");
let mysql = require("mysql");

let app = express();

// whenever you use bodyparser and express module it is required to use this syntax
app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb',extended:true}));
app.use(express.json());
//above line must be at the end


// syntax from w3-school (mysql nodejs)
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mycollege"
});


//this syntax is must required to run you project on chrome
app.get("/",(req,res)=>{
    res.end("Welcome to API");
});


app.post("/students",(req,res)=>{
    let body = req.body; //this line collects postman data using help of app.use()

    let sql = `INSERT INTO students(rollno,name,percentage) VALUES(${body.rollno},'${body.name.replace(/'/g,"''")}',${body.percentage})`;
    // let sql = "INSERT INTO students(rollno,name,percentage) VALUES("+ body.rollno + ",'"+ body.name.replace(/'/g,"''")+"',"+body.percentage +")";

    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({status:"failed",data:err}));
        }
        con.query(sql,(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed",data:result}));
            }
            res.end(JSON.stringify({status:"success",data:result}));
        })
    })
});


app.get("/students",(req,res)=>{
    let body = req.body; //this line collects postman data using help of app.use()

    let sql = 'SELECT * FROM students';
    // let sql = "INSERT INTO students(rollno,name,percentage) VALUES("+ body.rollno + ",'"+ body.name.replace(/'/g,"''")+"',"+body.percentage +")";

    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({status:"failed",data:err}));
        }
        con.query(sql,(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed",data:result}));
            }
            res.end(JSON.stringify({status:"success",data:result}));
        })
    })
});


app.get("/students/:id",(req,res)=>{
    let body = req.body; //this line collects postman data using help of app.use()

    let sql = `SELECT * FROM students WHERE rollno = ${req.params.id}`;
    // let sql = "INSERT INTO students(rollno,name,percentage) VALUES("+ body.rollno + ",'"+ body.name.replace(/'/g,"''")+"',"+body.percentage +")";

    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({status:"failed",data:err}));
        }
        con.query(sql,(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed",data:result}));
            }
            res.end(JSON.stringify({status:"success",data:result}));
        })
    })
});


app.put("/students/:id",(req,res)=>{
    let body = req.body; //this line collects postman data using help of app.use()

    let sql = `UPDATE students SET rollno = ${body.rollno},name='${body.name.replace(/'/g,"''")}',percentage = ${body.percentage} WHERE rollno = ${req.params.id}`;

    // let sql = "INSERT INTO students(rollno,name,percentage) VALUES("+ body.rollno + ",'"+ body.name.replace(/'/g,"''")+"',"+body.percentage +")";

    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({status:"failed",data:err}));
        }
        con.query(sql,(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed",data:result}));
            }
            res.end(JSON.stringify({status:"success",data:result}));
        })
    })
});


app.delete("/students/:id",(req,res)=>{
    let body = req.body; //this line collects postman data using help of app.use()

    let sql = `DELETE FROM students WHERE rollno = ${req.params.id}`;

    // let sql = "INSERT INTO students(rollno,name,percentage) VALUES("+ body.rollno + ",'"+ body.name.replace(/'/g,"''")+"',"+body.percentage +")";

    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({status:"failed",data:err}));
        }
        con.query(sql,(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed",data:result}));
            }
            res.end(JSON.stringify({status:"success",data:result}));
        })
    })
});


app.listen(8081,()=>{
    console.log("Project is running");
})

