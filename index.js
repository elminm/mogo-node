const { default: mongoose } = require("mongoose");
const { Schema } = mongoose

const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://Elminm:jNEw1D2pOtGgGwBg@cluster0.kuxordu.mongodb.net/usersdb');

let userSchema = new Schema({
    name: String,
    username: String,
    email:String
})
let productSchema = new Schema({
    name: String,
    unitPrice: Number,
    unitsInstock: Number,
    date: { type: Date, default: Date.now}
})

//user adında bir collection design ettim
// let userSchema = new Schema({
//     name: String,
//     surname: String,
//     email: String
// })

//bu dizaynı mongoya haber verdim.
// let Product = mongoose.model('Product', productSchema)

let User = mongoose.model('User', userSchema)
let Products = mongoose.model('Products', productSchema)



app.get('/products/api', (req, res) => {
    Products.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
app.get('/products/api/:id', (req, res) => {
    Products.findById(req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
})
app.post('/products/api', (req, res) => {

    let product = new Products({
        name: req.body.name,
        unitPrice: req.body.unitPrice,
        unitsInstock: req.body.unitsInstock
    })
    product.save();
    res.json(product);
})
app.put('/products/api/:id', (req, res) => {
    let id = req.params.id
    let newProduct = {
        name:req.body.name,
        unitPrice:req.body.unitPrice,
        unitsInstock:req.body.unitsInstock,
        date: new Date
    }
    Products.findByIdAndUpdate(id,newProduct,{new:true}).then(()=>{
        res.json({msg:'updated'})
    }).catch(err=>res.json(err))
})


///////////////////////
app.get('/users/api', (req, res) => {
    User.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

app.post('/users/api', (req, res) => {

    let user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    })
    user.save();
    res.json(user);
})

app.delete('/users/api/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


// app.get('/api/products/:id', (req, res) => {

//     let id = req.params.id;

//     Product.findById(id)
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json(err);
//         })

// })


// app.delete('/api/products/:id', (req, res) => {

//     let id = req.params.id;

//     Product.findByIdAndRemove(id)
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err => {
//         res.status(500).json(err)
//     })

// })



app.listen(8080);