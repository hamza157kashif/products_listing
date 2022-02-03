import { BaseEntity, Column,  Entity, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";
import { ProductCategory } from "./ProductCategory";
@Entity('products')
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    imageURL!:string;

    // @ManyToOne(() => ProductCategory, product => product.category)
    // product!: ProductCategory;

}