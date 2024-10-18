const Blog = require("../model/schema")


const blog_index = (req, res) => {

    Blog.find().sort({createdAt : -1}).then((result) => {

        let allblogs = "No Blogs for today :("

        if(result.length != 0){
            allblogs = "All Blogs"
        }

        res.render("index", {title : "Home Page", blogs : result, allblogs})


    }).catch(err => {console.log(err)})

}


const blog_post = (req, res) => {

    const blog = new Blog(req.body)

    blog.save().then((result) => {

        res.redirect("/blogs")

    }).catch(err => console.log(err))


}


const blog_delete = (req, res) => {

    const id = req.params.id
    
    console.log(id)

    Blog.findByIdAndDelete(id).then(() => {

        res.json({redirect : "/blogs"})


    }).catch(err => console.log(err))

}

const blog_get = (req, res) => {

    const id = req.params.id

    Blog.findById(id).then((result) => {
        res.render("details", {title : "Blog Details", blog : result})

    }).catch(err => console.log(err))

}

module.exports = {blog_index, blog_post, blog_delete, blog_get}
