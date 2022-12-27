const Product = require('../models/product');
const Cart=require('../models/cart');
const Order=require('../models/order');
const OrderItem=require('../models/orderItem');
const {or} = require("sequelize");
exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // });
//   Product.fetchAll()
//   .then(([rows,filedata])=>{
//     res.render('shop/product-list', {
//           prods: rows,
//           pageTitle: 'All Products',
//           path: '/products'
//         });
// }).catch(err=> console.log(err));
  Product.findAll().then(
      products=> {
        res.render('shop/product-list', {
          prods: products,
          pageTitle: 'All Products',
          path: '/products'
        });
      }
  ).catch(err=> console.log((err)));
};

exports.getProduct = (req, res, next) => {
  
  // file controller
  // Product.findById(prodId, product => {
  //   res.render('shop/product-detail', {
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/products'
  //   });
  // });
  /// work with SQL
  // Product.findById(prodId).then(([product])=>{
  //
  //   res.render('shop/product-detail', {
  //     product: product[0],
  //     pageTitle: product.title,
  //     path: '/products'
  //   });
  // }).catch(err=>console.log(err));

  /// work with ORM

  const prodId = req.params.productId;
  Product.findAll({where:{id:prodId}}).then(
      product=>{
          res.render('shop/product-detail', {
              product: product[0],
              pageTitle: product[0].title,
              path: '/products'
          });
      }
  ).catch()
  // Product.findByPk(prodId).then(
  //     product=>{
  //       res.render('shop/product-detail', {
  //             product: product,
  //             pageTitle: product.title,
  //             path: '/products'
  //           });
  //     }
  // ).catch(err=>console.log(err));
};

exports.getIndex = (req, res, next) => {
  //file controller
  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });
  
  //Database controller
  // Product.fetchAll()
  // .then(([rows,filedata])=>{
  //   res.render('shop/index', {
  //         prods: rows,
  //         pageTitle: 'Shop',
  //         path: '/'
  //       });
  // }).catch(err=> console.log(err));

  /// work with ORM

  Product.findAll().then(
      products=>{
        res.render('shop/index', {
          prods: products,
          pageTitle: 'Shop',
          path: '/'
      })
      }
  ).catch(err=> console.log((err)));
};

exports.getCart = (req, res, next) => {
    /// work with file system to save
  // Cart.getCart(cart=>{
  //   Product.fetchAll(products=>{
  //     const cartProducts=[];
  //     for(product of products){
  //       const cartProductData=cart.products.find(prod=> prod.id === product.id);
  //       if(cartProductData){
  //         cartProducts.push({productData:product, qty:cartProductData.qty});
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   })
  // })
/// work with orm and DB to save
    req.user.getCart().then(
        cart=>{
            return cart
                .getProducts().then(
                    products=>{
                        res.render('shop/cart', {
                                  path: '/cart',
                                  pageTitle: 'Your Cart',
                                  products: products
                                });
                    }
                ).catch(err => console.log(err))
        }
    ).catch(err=>console.log(err));
};
exports.postCart=(req,res,next)=>{
  // Product.findById(prodId,(product)=>{
  //   Cart.addProduct(prodId,product.price);
  // });
  // res.redirect('/cart');

  const prodId=req.body.productId;
  let fetchCart;
  let newQty=1;
    req.user.getCart().then(
        cart=>{
            fetchCart=cart;
            return cart.getProducts({where:{id:prodId}}).then(
                products=>{
                    let product;
                    if(products.length>0){
                         product=products[0];
                    }

                    if(product){
                        let OldQty=product.cartItem.quantity;
                        newQty=OldQty+1;
                        return product;
                    }
                    return Product.findByPk(prodId);
                }
            ).then( product=>{
                     return fetchCart.addProduct(product,{through:{quantity:newQty}});
                }
            ).then(
                ()=>{
                    res.redirect('/cart')
                }
            ).catch(err => console.log(err));
        }
    ).catch(err => console.log(err))
}

exports.postCartDeleteProduct=(req,res,next)=>{
const prodId=req.body.productId;
// Product.findById(prodId,product=>{
//   Cart.deleteProduct(prodId,product.price);
//   res.redirect('/cart')
// })
    req.user.getCart().then(cart=>{
            return cart.getProducts({where:{id:prodId}})
        }
    ).then(products=>{
        const product=products[0];
        return product.cartItem.destroy();
    }).then(
        ()=>{
            res.redirect('/cart')
        }
    ).catch(err =>console.log(err));
}
exports.postOrder=(req,res,next)=>{
    let fetchcart
    req.user.getCart()
        .then(cart=>{
            fetchcart=cart;
            return cart.getProducts()
            }
            ).then(products=>{
                return req.user.createOrder()
                    .then(order=>{
                        return order.addProducts(
                            products.map(product=>{
                                    product.orderItem={quantity: product.cartItem.quantity};
                                    return product;
                                }
                            )
                        )
                    })
                    .then(()=>{
                            return fetchcart.setProducts(null);
                        }
                    ).then(
                        ()=>{
                            res.redirect('/orders')
                        }
                    ).catch(err =>console.log(err));
                }
             ).catch(err => console.log(err));
}
exports.getOrders = (req, res, next) => {
    req.user.getOrders({include:['products']})
        .then(orders=>{
          res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
              orders:orders
          });
        })
        .catch(err => console.log(err));
};

exports.postOrderDeleteItem=(req,res,next)=>{
    const prodId=req.body.productId;
    const orderID=req.body.orderId;

    OrderItem.findAll({where:{orderId:orderID}}).then(orders=>{
        if(orders.length===1){
            // console.log('true is one')
            Order.destroy({where:{id:orderID}}).then(
                ()=>{
                    res.redirect('/orders')
                }
            )
        }else{
            OrderItem.destroy({where:{productId:prodId}})
                .then(
                    res.redirect('/orders')
                    )
        }
    })

 // OrderItem.destroy({where:{productId:prodId}})
 //     .then(
 //         res.redirect('/orders')
 //         )
}


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
