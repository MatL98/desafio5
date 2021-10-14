const express = require("express")
const { Socket } = require("socket.io")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const port = process.env.PORT || 8080
const handlebars = require("express-handlebars");
const moment = require("moment")


app.use(express.static(__dirname + "/public"))
app.set("views" , __dirname + "/views")
app.set("view engine", "hbs")
app.engine("hbs", handlebars({
    layoutsDir: __dirname + "/views/layouts",
    extname: 'hbs'
    
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))




const products = []
const mess = []

app.get("/",(req,res) =>{
    res.render("index", {layout: "main"})
})
app.get("/products",(req,res) =>{
    res.render("product", {data: products, layout: "main"})
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
    res.sendFile("public/index.html", {root: "."})
})
io.on("connection" ,(socket)=>{
    console.log("User connected")
    socket.emit("message", mess)

	socket.on("message-client", (data)=>{
	console.log(data)
	})
	socket.on("new-message", function(data){
	console.log(data)
	mess.push(data)
	io.sockets.emit("message", mess)
	//socket.emit()
	})
})
server.listen(port, () => {
    console.log(`Server on port ${port}`)

})