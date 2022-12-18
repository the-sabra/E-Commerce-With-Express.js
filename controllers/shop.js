const Product = require('../models/product');
const Cart=require('../models/cart');
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
  Cart.getCart(cart=>{
    Product.fetchAll(products=>{
      const cartProducts=[];
      for(product of products){
        const cartProductData=cart.products.find(prod=> prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData:product, qty:cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    })
  })
};
exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId,(product)=>{
    Cart.addProduct(prodId,product.price);
  });
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};
exports.postCartDeleteProduct=(req,res,next)=>{
const prodId=req.body.productId;
Product.findById(prodId,product=>{
  Cart.deleteProduct(prodId,product.price);
  res.redirect('/cart')
})
}
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
