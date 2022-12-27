const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./util/DB')
const errorController = require('./controllers/error');
const User=require('./models/user');
const Product=require('./models/product');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Cart=require('./models/cart');
const CartItem=require('./models/cartItem');
const Order=require('./models/order');
const OrderItem=require('./models/orderItem');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findByPk(1).then(
        user=>{
            req.user=user;
            next();
        }
    ).catch(err=>console.log(err));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
User.hasMany(Product,{constraints:true,onDelete:'CASCADE'})
User.hasOne(Cart);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem})
sequelize
    .sync()
    // .sync({force:true})
    .then( res=> {
        return User.findByPk(1);
    }).then(
        user=>{
        if(!user){
            return User.create({name:'admin',email:'test@test.com'})
        }
        return  user
    })
    // .then(user=>{
    //     return user.createCart();
    // })
    .then(cart=>{
        app.listen(3000)
     }
   )
.catch(err=>{console.log(err)});
// sequelize.sync().then().catch(err=>console.log(err));

