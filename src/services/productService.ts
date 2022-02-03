import { Service } from "typedi";
import { getRepository}   from "typeorm";
import { Product } from "../enitities/Product";

const connect=require("../index");

@Service()
export class ProductService {

    public async addProduct(product:Product):Promise<boolean>{
        await getRepository(Product).save(product);
        return true;
    }

    public async getProducts():Promise<Product[]>{
        const prod =  getRepository(Product).find();
        
        return prod;
    }

    public async getSingleProduct(id:number){
       
        const singleProduct=getRepository(Product).findOne(id);
        
        return singleProduct;
        
    }
}