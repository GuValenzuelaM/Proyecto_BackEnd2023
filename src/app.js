//DESAFIO 3



//const express = require('express');
//const fs = require('fs');

import express from "express";
import {ProductManager} from "../ProductManager.js";
import {fs} from "../ProductManager.js";

const app =express();
const port = 8080;

app.listen(port,()=>console.log(`Server listening on port${port}`));

app.get("/",(request,response)=>{
    response.send("Bienvenido al Desafio 3");
});

/*
app.get("/products",(request,response)=>{
    response.send("Bienvenido a Productos");
});
*/

//--------------------------
/*
app.get('/products', (req, res) => {
    fs.readFile('products.json', (err, data) => {
      if (err) throw err;
  
      const products = JSON.parse(data);
  
      res.send(products);
    });
});
*/

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  
  fs.readFile('products.json', (err, data) => {
    if (err) throw err;

    const products = JSON.parse(data);

    if (limit && !isNaN(limit)) {
      res.send(products.slice(0, limit));
    } else {
      res.send(products);
    }
  });
});

  