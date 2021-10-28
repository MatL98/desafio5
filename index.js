const express = require("express")
const  socket  = require("socket.io")
const app = express()
const http = require("http")
const server = http.createServer(app)
const port = process.env.PORT || 8080
const handlebars = require("express-handlebars");
const routerProducts = require("./routes/products")
const routerQuestion = require("./routes/question")


app.use(express.static(__dirname + "/public"))
app.set("views" , __dirname + "/views")
app.set("view engine", "hbs")
app.engine("hbs", handlebars({
    layoutsDir: __dirname + "/views/layouts",
    extname: 'hbs'
    
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", routerProducts)
app.use("/", routerQuestion)




server.listen(port, () => {
    console.log(`Server on port ${port}`)
})