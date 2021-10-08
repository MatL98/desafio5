const express = require("express")
const app = express()




app.set("port" , process.env.PORT || 8080)
app.set("views" , "./views")


app.set("views" , __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))




const products = []


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
app.listen(app.get("port") , () => {
    console.log(`Server on port ${app.get("port")}`)

})