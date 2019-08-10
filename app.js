const express=require('express')
const stripe=require('stripe')('{{private stripe key}}')
const bodyParser=require('body-parser')
const exphbs=require('express-handlebars')

const app=express()

//handlebars-middleware

app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')


//bodyparser middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//static folder for images and css
app.use(express.static(`${__dirname}/public`))



//index route
app.get('/',(req,res)=>{
    res.render('index')

})

//charge route

app.post('/charge',(req,res)=>{
    const amount=5000
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken
    })
    .then(customer=>stripe.charges.create({
        amount,
        description:'Bajaj piston',
        currency:'usd',
        customer:customer.id

    }))
    .then(charge=>res.render('success'))
})

app.post('/charge1',(req,res)=>{
    const amount=6000
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken
    })
    .then(customer=>stripe.charges.create({
        amount,
        description:'Bajaj camshaft',
        currency:'usd',
        customer:customer.id

    }))
    .then(charge=>res.render('success'))
})




const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`server running at ${port} port`)
})
