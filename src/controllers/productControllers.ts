import  Express  from "express";
import { Product } from "../enitities/Product";
import { ProductService } from "../services/productService";
import { Body, Get, JsonController, Param, Post, Res } from "routing-controllers";
import { Request,Response } from "express";
const router=Express.Router();
let service=new ProductService();
let msg="succesful";

@JsonController()
export class ProductController{
   
    @Post('/newProduct')
    post(@Body() product:Product,@Res() response:any){

        if(!service.addProduct(product)){
            return response.json({
                msg:"not added"
            })
        }
        else{
            return response.json({
                msg:"added"
            })
        } 
    }

    @Get('/products')
    async getAll(@Res() res: Response){
        const product = await service.getProducts();
       // console.log(prod);
        
        return res.json(product);
    }
    @Get('/products/:id')
    async getone(@Param('id') id :number ,@Res() res:Response){
        const product=await service.getSingleProduct(id);
        //console.log(product);
        
        return res.json(product);

    }

}