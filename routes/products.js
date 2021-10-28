const express = require("express")
const { Router } = express;
const router = new Router();
const knex = require("../db")


router.get("/form",(req,res) =>{
    res.render("index", {layout: "main"})
})
router.get("/products",(req,res) =>{
    knex.from("products").select("*")
    .then((data)=>{
        res.render("product", {data: data, layout: "main"})
    })
})
router.get("/productsForId/:id",(req,res) =>{
    let id = req.params.id
    knex.from("products").select("*").where({id: id})
    .then((data)=>{
        res.render("product", {data: data, layout: "main"})
    })
})
router.put("/updateProducts/:id", (req, res)=>{
    let id = req.params.id
    knex("products").where({id: id})
    .update({nameOfProducts: req.body.nameOfProducts, price: req.body.price, thumbnail: req.body.thumbnail})
    .then((data)=>{
        res.send({ msg: 'Producto Actulizado'})
    })
    .catch(err =>{
        console.log(err);
    })
})
router.post("/" , (req,res) =>{
    console.log(req.body)
    const {nameOfProducts , price , thumbnail} = req.body

    const obj = {
        nameOfProducts,
        price,  
        thumbnail
    }
    knex("products").insert(obj)
    .then((data)=>{
        res.send({ msg: 'Producto Agregado'})
    })
    .catch(err =>{
        console.log(err);
    })
    
    
})
router.delete("/deleteProducts/:id", (req, res)=>{
    let id = req.params.id
    knex("products").where({id: id}).del()
    .then((data)=>{
        res.send({ msg: 'Producto eliminado'})
    })
    .catch(err =>{
        console.log(err);
    })
})
module.exports = router;