const express = require("express")
const { Socket } = require("socket.io")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const port = process.env.PORT || 8080
const handlebars = require("express-handlebars");


app.use(express.static("public"))
app.set("views" , "./views")
app.set("views" , __dirname + "/views")
app.set("view engine", "hbs")
app.engine("hbs", handlebars({
    defaultLayout: 'views/index.hbs',
    layoutsDir: __dirname + "/views/layouts"
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))




const products = []
const msgs = []

app.get("/",(req,res) =>{
    res.render("index", {})
    

})
app.get("/products",(req,res) =>{
    res.render("product", {data: products})
})
app.post("/" , (req,res) =>{
    console.log(req.body)
    const {title , price , thumbnail} = req.body

    const obj = {
        title,
        price,
        thumbnail
    }

    products.push(obj)
    res.json({ msg: 'Producto Agregado', obj })
    
})
app.get("/preguntas", (req, res)=>{
    res.render("question")
})
io.on("connection" ,(socket)=>{
    console.log("User connected")
})
app.listen(port, () => {
    console.log(`Server on port ${port}`)

})