export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: string[]
  expirationDate: Date;

}

export interface ICleaningProduct extends IProduct {
  
}
export type omitInfoProdCleaning=Omit<ICleaningProduct,"id"|"expirationDate">

export interface IFoodProduct extends IProduct {
  calories: number;
}
export type omitInfoProdFood=Omit<IFoodProduct,"id"|"expirationDate">
