// const path=require('path');
// const fs =require('fs');
// const { json } = require('body-parser');
// const p=path.join(
// path.dirname(process.mainModule.filename),
// 'data',
// 'cart.json'
// );
// // module.exports=class Cart{
// //     static addProduct(id,productPrice){
// //         //Fetch the previous cart
// //         fs.readFile(p,(err,fileContent)=>{
// //         let cart={products:[],totalPrice:0};
// //             if(!err){
// //                 cart=JSON.parse(fileContent);
// //             }
// //             //Anlyze  the cart =>find exting product
// //             const existingProductIndex=cart.products.findIndex(prod=> prod.id===id);
// //             const existingProduct=cart.products[existingProductIndex];
// //             let updatedProduct;
// //             if(existingProduct){
// //                 updatedProduct={...existingProduct};
// //                 updatedProduct.qty=updatedProduct.qty+1;
// //                 cart.products=[...cart.products];
// //                 cart.products[existingProductIndex]= updatedProduct;
// //             }else{
// //                 updatedProduct={id:id,qty:1};
// //                 cart.products=[...cart.products,updatedProduct];
// //             }
// //             if(cart.totalPrice==='' || productPrice==='' ){
// //                 cart.totalPrice=0;
// //                 productPrice=0;
// //             }else{
// //                 cart.totalPrice= Number.parseInt(cart.totalPrice) + Number.parseInt(productPrice);
// //             }
// //             fs.writeFile(p,JSON.stringify(cart),(err)=>{
// //                 console.log(err);
// //             });
// //         });
// //     }
// //     static deleteProduct(id,productPrice){
// //         fs.readFile(p,(err,fileContent)=>{
// //             if(err){
// //                 console.log(err);
// //             }
// //             const updatedCart={...JSON.parse(fileContent)};
// //             const product=updatedCart.products.find(prod=>prod.id===id);
// //             const productQty = product.qty;
//             updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id);
//             updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty;
//             fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
//                 console.log(err);
//             });
//         });
//     }
//     static getCart(cb){
//         fs.readFile(p,(err,fileContent)=>{
//             const cart=JSON.parse(fileContent);
//             cb(null)
//             }else{
//                 cb(cart);
//             }
//         })
//     }
// };


const Sequelize=require('sequelize');
const sequelize=require('../util/DB');
const Cart=sequelize.define('cart',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});
module.exports=Cart;