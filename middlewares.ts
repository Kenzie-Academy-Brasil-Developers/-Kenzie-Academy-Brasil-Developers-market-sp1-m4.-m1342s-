import { NextFunction, Request, request,Response } from "express";
import market from "./database";
import {IProduct, IFoodProduct, omitInfoProdCleaning, omitInfoProdFood, ICleaningProduct} from "./interfaces";



const IdExistence=(request:Request,response:Response,next:NextFunction)=>{
    const productID = request.params.id;
  const foundProductIndex: number = market.findIndex(
    (product): boolean => product.id === Number(productID)
  );
  if (foundProductIndex === -1) {
    const error: string = "Produto não encontrado ou não existe";
    return response.status(404).json({ error });
    }
    response.locals={
        ...response.locals,
        foundProductIndex
    }
    return next()
}

const nameExistence=(request:Request,response:Response,next:NextFunction)=>{
    const body:omitInfoProdCleaning|omitInfoProdFood = request.body;
    const productExistence:IProduct|undefined=market.find((product:IProduct):boolean=>product.name===body.name)
  if (productExistence) {
    const error: string = "Product already registered";
    return response.status(409).json({ error });
  }
  response.locals={
        ...response.locals,
    }
    return next()
}
export default{ IdExistence, nameExistence }