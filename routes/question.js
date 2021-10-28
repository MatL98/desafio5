const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server)
const { Router } = express;
const router = new Router();
const knex = require("../knexfile")

app.get("/", (req, res)=>{
    res.sendFile("public/index.html", {root: "."})
})
io.on("connection" ,(socket)=>{
    console.log("User connected")
    socket.emit("message", knex("msns"))

	socket.on("message-client", (data)=>{
	console.log(data)
	})
	socket.on("new-message", function(data){
	console.log(data)
    let msn = {
        email: data.mail,
        message: data.msn
    }
	knex("msns")
    .insert(msn)
    .then(()=>{
        res.send({message: "mensaje enviado"})
    })
	io.sockets.emit("message", knex.from("msns").select("mail", "msn"))
	//socket.emit()
	})
})

module.exports = router