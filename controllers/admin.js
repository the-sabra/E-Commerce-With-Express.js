const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  /// work with sql

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(null,title, imageUrl, description, price);
  // product.save();
  // res.redirect('/');

  /// work with ORM Sequelize
    req.user.createProduct({
  //   Product.create().then({
        title:title,
        imageUrl:imageUrl,
        price:price,
        description:description,
    })
    .then(
      res.redirect('/')
  ).catch(err=>console.log(err));
};
exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }
  const prodId=req.params.productId;
  // Product.findByPk(prodId)
      req.user.getProducts({where: {id : prodId}})
          .then(
              products=>{
             const product=products[0];
                if(!product){
                    return res.redirect('/');
                }
            res.render('admin/edit-product', {
              pageTitle: 'Edit Product',
              path: '/admin/edit-product',
              editing:editMode,
              product:product
    });
  }).catch(err=>console.log(err));
};
exports.postEditProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedPrice=req.body.price;
  const updatedDes=req.body.description;
  const updatedImgeUrl=req.body.imageUrl;
  /// work with sql

  // const updateProduct=new Product(null,updatedTitle,updatedImgeUrl,updatedDes,updatedPrice);
  //   updateProduct.save()
  //   .then(()=>{
  //     res.redirect('/admin/products')
  //   })
  //   .catch(err=>console.log(err));

  /// work with ORM

  Product.findByPk(prodId)
      .then(
      product=>{
        product.title=updatedTitle;
        product.price=updatedPrice;
        product.description=updatedDes;
        product.imageUrl=updatedImgeUrl;
        return product.save();
      }
  ).then(resu=> {
        console.log("UPDATED!!");
         res.redirect('/admin/products');
      }
  ).catch(err=>console.log(err));
};
exports.getProducts = (req, res, next) => {

  /// work with JSON file system

  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });


  /// work with ORM
    req.user.getProducts().then(
  //   Product.findAll().then(
        products=> {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        }
    ).catch(err=>console.log(err));
};
exports.postDeleteProduct=(req,res,next)=>{
  const productId=req.body.productId;
  // Product.deleteById(productId);
  Product.destroy({where:{id:productId}}).then(
      product=>{
       res.redirect('/admin/products');
      }
  ).catch(
      err=>console.log(err)
  );

};

