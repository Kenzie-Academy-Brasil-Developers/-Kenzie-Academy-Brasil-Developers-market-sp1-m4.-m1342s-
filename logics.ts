import { Request, Response, json, response } from "express";
import market from "./database";
import {IProduct, IFoodProduct, omitInfoProdCleaning, omitInfoProdFood, ICleaningProduct} from "./interfaces";

const productList = (request: Request, response: Response): Response => {
  return response.status(200).json(market);
};

const addProductToList = (request: Request, response: Response): Response => {
  const body: Array<omitInfoProdCleaning | omitInfoProdFood> = request.body;

  const addProducts: Array<ICleaningProduct | IFoodProduct> =
  
   body.map(
    (product: omitInfoProdCleaning | omitInfoProdFood) => {
      const newProduct: ICleaningProduct | IFoodProduct = {
        id: market.length + 1,
        ...product,
        expirationDate: new Date(2024, 5, 24),
      };
      market.push(newProduct);
      return newProduct;
    }
   
  );
  const bodyRequest:omitInfoProdCleaning | omitInfoProdFood= request.body;
  const productExistence:IProduct|undefined=market.find((product:IProduct):boolean=>product.name===bodyRequest.name)
  if (productExistence) {
    const error: string = "Product already registered";
    return response.status(409).json({ error });
    
  }

  const totalMarket: number = addProducts.reduce(
    (acc, cv) => acc + cv.price,
    0
  );

  return response
    .status(201)
    .json({ total: totalMarket, marketProducts: addProducts });
};

const getProductById = (request: Request, response: Response): Response => {
  const {productID} = response.locals;
  const product:IProduct=market[productID]
  return response.json(product);
};

const deleteProduct = (request: Request, response: Response): Response => {
  const productID = request.params.id;

  const {foundProductIndex}= response.locals

  market.splice(foundProductIndex, 1);
  return response.status(204).json();
};

const editProduct = (request: Request, response: Response): Response => {
  const {verifyId}=response.locals
  const productID = request.params.id;
  const foundProductIndex: number = market.findIndex(
    (product): boolean => product.id === Number(productID)
  );
  const body:omitInfoProdCleaning|omitInfoProdFood = request.body;
  const updateProduct:omitInfoProdCleaning|omitInfoProdFood = (market[foundProductIndex] = {
    ...market[foundProductIndex],
    ...body,
  });
  
  return response.status(200).json(updateProduct);
};
export {
  productList, addProductToList, getProductById, deleteProduct,editProduct};
