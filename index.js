const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const Todo = require("./models/todo")

const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.set("port" ,port)
app.use(express.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use("/api/todo",todoRoutes)

// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));

//routes
app.get("/", (req, res) => {
    Todo.find()
    .then(result => {
        res.render("index", { data: result})
        console.log(result)
    })
})

app.post("/", (req, res) => {
    const todo = new Todo({
        todo: request.body.TodoValue
    })
    todo.save()
    .then(result => {
        res.redirect("/")
    })
})

app.delete("/", (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
    .then(result => {
        console.log(result)
    })
})

app.listen(port, () => {
    console.log("Server is running on port" + port)
});