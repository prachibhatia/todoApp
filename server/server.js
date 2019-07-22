const express = require("express")
const path = require("path")
const moment = require("moment")
const app = express();
const port = process.env.port || 5680
const db = require('./db/connection')

app.use(express.json())
app.use(express.urlencoded(
     {
          extended : true
     }
))
let allTodos= [];

app.post('/todos',(req,res)=>{
     db.getConnection((err , connection) =>{
          if(err){
               console.log(err);
               connection.release();
               return ; 
          }
          else{
               console.log("Hello")
               connection.query(`INSERT INTO todo (todo_name) VALUES ('${req.body.todos}');` , (err ,rows , fields) =>{
                    if(err){
                         console.log(err)
                         return res.send(err)
                    }
                    else {
                    return res.send({"inserted": true})
                    connection.release()
                    }
                    return res.send({"trying":"fff"})
               })
          }
     })
     console.log(req.body)
     allTodos.push(req.body)
     // return res.send(allTodos)
})

let user ;
let pswd ;
app.post('/loginform',(req,res)=>{
     db.getConnection((err , connection) =>{
          if(err){
               console.log(err);
               connection.release();
               return ; 
          }
          else{
               console.log("Hello")
               connection.query(`INSERT INTO User_details (user_name,password) VALUES ('${req.body.email}','${req.body.password}');` , (err ,rows , fields) =>{
                    if(err){
                         console.log(err)
                         return res.send(err)
                    }
                    else {
                    return res.send({"inserted": true})
                    connection.release()
                    }
                    return res.send({"trying":"fff"})
               })
          }
     })
      //user = req.body.email;
      //pswd = req.body.password;
       //res.send(user +" "+pswd);
})


app.delete('/deleteAll',(req , res)=>{
     //allTodos = [];
     db.getConnection((err , connection) =>{
          if(err){
               console.log(err);
               connection.release();
               return ; 
          }
          else{
               //console.log("Hello")
               connection.query(`DELETE FROM todo` , (err ,rows , fields) =>{
                    if(err){
                         console.log(err)
                         return res.send(err)
                    }
                    else {
                    return res.send({"deleted": true})
                    connection.release()
                    }
                    return res.send({"trying":"fff"})
               })
          }
     })
     //res.send({deleted: true})
})


app.get('/alltodo',(req,res)=>{
     db.getConnection((err , connection) =>{
          if(err){
               console.log(err);
               connection.release();
               return ; 
          }
          else{
               connection.query(`SELECT todo_name FROM todo` , (err ,rows , fields) =>{
                    if(err){
                         console.log(err)
                         return res.send(err)
                    }
                    else {
                    console.log(rows)
                    return res.send(rows)
                    connection.release()
                    }
                    return res.send({"trying":"fff"})
               })
          }
     })
     //   return res.send(allTodos)
})

app.use('/' , express.static('../client'))

app.get('/login',(req,res) => {
     res.setHeader('Content-Type' , "text/html")
     res.sendFile(path.join(__dirname,'../client/login.html'))
})

 app.get('/todo',(req,res) => {
           res.setHeader('Content-Type' , "text/html")
      res.sendFile(path.join(__dirname,'../client/index.html'))
 })

//app.use('/todos',express.static('../client') )

/*app.get('/todo:no',(req,res)=>{
     let no = parseInt(req.params.no);
     res.send(no);
})*/

app.listen( port ,() => console.log(`server started on port http://localhost:${port}`))