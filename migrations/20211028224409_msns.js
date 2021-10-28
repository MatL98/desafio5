
exports.up = function(knex) {
    knex.schema
        .createTable("msns", function(table){
        table.increments("id").primary();
        table.string("email", 128);
        table.string("message");
    })
    .then(()=>{
        console.log("table created");
    })
    .catch((err) =>{
        console.log(err);
    })
};

exports.down = function(knex) {

};
