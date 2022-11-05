const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT ;
const bodyParser = require('body-parser');
const path = require('path')


mongoose.connect("mongodb+srv://bloguser:bloguser%4077@cluster0.pom0ef7.mongodb.net/test", {});

const connection= mongoose.connection;
connection.once("open", ()=>{
    console.log("Mongodb connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const userRoute= require("./routes/user");



app.use("/user", userRoute);

app.route("/").get( (req,res)=> {
    res.json("chalja we maahiya")
});

app.listen(port, ()=>{
    console.log("Listening on port ${port} ")
});
