const express = require('express')
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
const port = 8000

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

let posts = [
    {
        id : uuidv4(),
        username:"prasad",
        content:"I Love Coding"
    },
    {
        id : uuidv4(),
        username:"ramu",
        content:"I Love Dancing"
    },
    {
        id : uuidv4(),
        username:"kishore",
        content:"I Love singing"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

//create
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

//insert
app.post("/posts",(req,res)=>{
    let {username,content} = req.body
    let id = uuidv4();
    posts.push({id,username,content})
    res.redirect('/posts')
})



app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id==p.id)
    res.render("show.ejs",{post})
})

app.get("/",(req,res)=>{
    res.send("respose sent")
})

//update route
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content
    let post = posts.find((p)=>id==p.id)
    post.content = newContent;
    res.redirect('/posts')
})

//Edit route
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id==p.id)
    console.log(post)
    res.render('edit.ejs',{post})
})

//Delete route
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !==p.id)
    res.redirect('/posts')
})
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})