const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")


const blogController = require("./controllers/blogController")
const port = 3000;

const blogRoutes = require("./routes/blogRoutes")

const dbURI = process.env.DBURI

const app = express();

app.set("views", "views")

app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(morgan("dev"))

app.use(express.urlencoded({extended : true}))


mongoose.connect(dbURI).then(() => {

    console.log("Connected to DB")

    app.listen(port, () => {

        console.log(`App is listening to port ${port}`)

    })

    
}).catch(err => console.log(err))



app.get("/", (req, res) => {

    res.redirect("/blogs")

})

app.get("/blogs/about", (req, res) => {

    res.render("about", {title : "About Page"})
})

app.get("/blogs/create", (req, res) => {

    res.render("create", {title : "Create Blog"})


})

app.use("/blogs", blogRoutes)


app.use((req, res) => {
    res.status(404).render("404", {title: "404"})
})