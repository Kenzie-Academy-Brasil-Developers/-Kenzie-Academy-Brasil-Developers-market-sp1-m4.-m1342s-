import { Application, Request, Response, json } from "express";
import express from "express"
import { productList,addProductToList, getProductById,deleteProduct,editProduct } from "./logics";
import market from "./database";
import middlewares from "./middlewares";

const app: Application = express();
app.use(express.json())

app.get("/products", productList)
app.get("/products/:id",middlewares.IdExistence,getProductById)
app.post("/products",middlewares.nameExistencePost,addProductToList);
app.patch("/products/:id",middlewares.IdExistence,middlewares.nameExistence,editProduct);
app.delete("/products/:id",middlewares.IdExistence,deleteProduct);

app.listen(3000, () => {
  console.log("Server");
});
