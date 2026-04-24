const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/productdb")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const productSchema = new mongoose.Schema({
  name:String,
  price:Number,
  category:String
});

const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async(req,res)=>{
   try{
      const products = await Product.find();
      res.json(products);
   }catch(error){
      res.status(500).json({message:"Server Error"});
   }
});

app.listen(5000, ()=>{
   console.log("Server running on port 5000");
});