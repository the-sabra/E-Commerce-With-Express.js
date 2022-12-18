const fs = require('fs');
const path = require('path');
const { threadId } = require('worker_threads');
const { postDeleteProduct } = require('../controllers/admin');
const Cart = require('./cart');

const db=require('../util/DB');
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id,title, imageUrl, description, price) {
//     this.id=id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     getProductsFromFile(products => {
//       if(this.id){
//         const existingProduct=products.findIndex(prod=> prod.id===this.id);
//         const updatedProduct=[...products]
//         updatedProduct[existingProduct]=this;
//         fs.writeFile(p, JSON.stringify(updatedProduct), err => {
//           console.log(err);
//         });
//       }else{
//       this.id = Math.random().toString();
//       products.push(this);
//       fs.writeFile(p, JSON.stringify(products), err => {
//         console.log(err);
//       });
//     }
//     });
//   }

//   static deleteById(id) {
//     getProductsFromFile(products => {
//       const product = products.find(prod => prod.id === id);
//       const updatedProducts = products.filter(prod => prod.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }
//   static fetchAll(cb) {
//     getProductsFromFile(cb);
//   }

//   static findById(id, cb) {
//     getProductsFromFile(products => {
//       const product = products.find(p => p.id === id);
//       cb(product);
//     });
//   }

// };

// work with sql model 

// module.exports = class Product {
//     constructor(id,title, imageUrl, description, price) {
//       this.id=id;
//       this.title = title;
//       this.imageUrl = imageUrl;
//       this.description = description;
//       this.price = price;
//     } 
  
//     save() {
//       return db.execute('INSERT INTO products(title,description,imageUrl,price) VALUES (?,?,?,?)',
//       [this.title,this.description,this.imageUrl,this.price])
//     }
  
//     static deleteById(id) {

//     }
//     static fetchAll() {
//       return db.execute('SELECT * FROM products');
//     }
  
//     static findById(id) {
//      return db.execute(`SELECT * FROM products WHERE   products.id = ${id}`)
//     }

//   };
  

// work with orm sequelize

const Sequelize=require('sequelize');
const sequelize = require('../util/DB');
const Product=sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  title:Sequelize.STRING,
  price:{
    type:Sequelize.INTEGER,
    allowNull: false,
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }
})
module.exports = Product;
