const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const Blog = require("./model/schema")
const port = 3000;

const dbURI = "mongodb+srv://hrithwin:clockmate@hrithwinpractise.xwjrl.mongodb.net/?retryWrites=true&w=majority&appName=hrithwinpractise"

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

app.get("/blogs", (req, res) => {

    Blog.find().sort({createdAt : -1}).then((result) => {

        let allblogs = "No Blogs for today"

        if(result.length != 0){
            allblogs = "All Blogs"
        }

        if(result)

        res.render("index", {title : "Home Page", blogs : result, allblogs})


    }).catch(err => {console.log(err)})
    


})


app.get("/blogs/about", (req, res) => {

    res.render("about", {title : "About Page"})
})

app.get("/blogs/create", (req, res) => {

    res.render("create", {title : "Create Blog"})


})


app.post("/blogs", (req, res) => {

    const blog = new Blog(req.body)

    blog.save().then((result) => {

        res.redirect("/blogs")

    }).catch(err => console.log(err))


})

app.get("/blogs/:id", (req, res) => {

    const id = req.params.id

    Blog.findById(id).then((result) => {
        res.render("details", {title : "Blog Details", blog : result})

    }).catch(err => console.log(err))
})


app.delete("/blogs/:id", (req, res) => {

    const id = req.params.id
    
    console.log(id)

    Blog.findByIdAndDelete(id).then(() => {

        res.json({redirect : "/blogs"})


    }).catch(err => console.log(err))
})




app.use((req, res) => {
    res.status(404).render("404", {title: "404"})
})