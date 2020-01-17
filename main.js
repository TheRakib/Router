const express = require("express");

const bodyparser = require("body-parser");


const app= express();
app.use(bodyparser.urlencoded({extended:false}));

app.set("views", "views" );
app.set("view engine", "ejs");

const products = [{} ];

app.get("/product" , (req, res)=>{
    res.render("product",  { products:products});
})

app.get("/admin", (req, res)=>{ 
    res.render("admin")
})
app.post("/admin", (req, res)=>{

const productObj = { 
    id:req.body.id,
    product_name:  req.body.product_name,
        price:     req.body.price
        };

        products.push(productObj);
        res.redirect("/product");
});

app.get("/product/:id", (req, res)=>{
    console.log(req.params.id)
   
   
    res.render("productEdit", {products, id:req.params.id})
})


app.post("/product/productEdit", (req, res)=>{
   console.log(req.body.product_name)
   console.log("request id " , req.body)
    //edit
   // console.log(products)
   //products[1].product_name = req.body.product_name
   products[Number(req.body.id)].product_name
    = req.body.product_name;
    products[Number(req.body.id)].id= req.body.id;
    products[Number(req.body.id)].price = req.body.price
    res.render("product", {products})
})

app.get("/productDelete/:id", (req, res)=>{
    console.log("delete params" , req.params.id)
   
  products.splice( req.params.id, 1)
   
   res.send("product deleted")
    
}) 



app.listen(8012);
