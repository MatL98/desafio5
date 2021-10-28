const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user:"root",
        password: "",
        database: "productosecommerce"
    },
    pool:{min : 2, max: 8}
})

knex.schema.createTableIfNotExists("products", function(table){
    table.increments("id").primary();
    table.string("nameOfProducts");
    table.float("price")
    table.string("thumbnail")
})
.then(()=>{
    console.log("table created");
}).catch(err =>{
    console.log(err);
})  

module.exports = knex