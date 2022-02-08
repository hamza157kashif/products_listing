import Express, { NextFunction, response } from "express";
import { Product } from "../enitities/Product";
import { ProductService } from "../services/productService";
import {
  Body,
  ContentType,
  Get,
  JsonController,
  Param,
  Post,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { Request, Response } from "express";
import multer from "multer";

const router = Express.Router();
let service = new ProductService();

const upload = multer({ dest: "uploads/" });

require("dotenv").config();
const fs = require("fs");
//import { S3 } from "aws-sdk";
const S3 = require("aws-sdk/clients/s3");

// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY;
// const secretAccessKey = process.env.AWS_SECRET_KEY;

const region = "us-east-1";

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
async function uploadFile(file: any) {
  console.log(file);
  const fileStream = await fs.createReadStream(file.path);
  if (file.mimetype === "image/png") {
    file.filename = file.filename.concat(".png");
  } else {
    file.filename = file.filename.concat(".jpg");
  }
  const uploadParams = {
    Bucket: "products-list-app",
    Body: fileStream,
    Key: file.filename,
    ContentType: file.mimetype,
  };
  //console.log("uploadparams:", uploadParams);

  return s3.upload(uploadParams).promise();
}

@JsonController()
export class ProductController {
  @Post("/newProduct")
  post(@Body() product: Product, @Res() response: any) {
    if (!service.addProduct(product)) {
      return response.json({
        msg: "not added",
      });
    } else {
      return response.json({
        msg: "added",
      });
    }
  }

  @Post("/uploadProduct")
  @UseBefore(upload.single("image"))
  async postingPictures(@Req() request: any, @Res() response: any) {
    const file = request.file;
    //console.log(file);
    const description = request.body.description;
    const name = request.body.productname;
    console.log("name:", name);
    const result = await uploadFile(file);
    //console.log(result);
    console.log("done with uploading");

    const url = result.Location;
    console.log("urllocation:", url);

    //creating product object
    const prod = Product.create({
      name,
      description,
      imageURL: url,
    });
    // prod.imageURL = prod.imageURL.concat(".jpg");

    response.set("Access-Control-Allow-Origin", "*");

    if (!service.addProduct(prod)) {
      return response.json({
        msg: "not added",
      });
    } else {
      return response.json({
        msg: "added",
      });
    }
  }

  @Get("/products")
  async getAll(@Res() res: Response) {
    const product = await service.getProducts();
    console.log("Fetching,", product);

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(product);
  }

  @Get("/products/:id")
  async getone(@Param("id") id: number, @Res() res: Response) {
    const product = await service.getSingleProduct(id);
    console.log(product);
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(product);
  }
}
