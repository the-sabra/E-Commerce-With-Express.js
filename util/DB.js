// work with sql in program 

// const mysql=require('mysql2');

// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-project',
//     password:'1234'
// })  

// module.exports=pool.promise();


const Sequelize = require('sequelize');

const sequelize=new Sequelize('node-project','root','1234',{dialect:'mysql',host:'localhost'});
module.exports=sequelize;