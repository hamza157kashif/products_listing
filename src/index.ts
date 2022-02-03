import { Connection, createConnection } from "typeorm";
import  Express  from "express";
import { Product } from "./enitities/Product";
import { ProductCategory } from "./enitities/ProductCategory";
import "reflect-metadata";
import { ProductController } from "./controllers/productControllers";
import { createExpressServer } from "routing-controllers";

const connect= Connection;
const app =createExpressServer({
    controllers:[ProductController],
});
const main=async()=> {
    try{
        await createConnection({
            type:"postgres",
            host:"localhost",
            port:5432,
            username:"postgres",
            password:'hamza',
            database:"productLists",
            entities:[Product,ProductCategory],
            synchronize:true
        })

            app.use(Express.json())
            console.log("connected to db");

            app.listen(8080,()=>{
                console.log("Server running at 8080");  
            })

      
    }
    catch(error){
        console.error(error);
        throw new Error("unable to connect db");
        
    }
}

main()
module.exports=connect;