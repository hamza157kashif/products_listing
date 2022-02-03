import { BaseEntity, Column,  Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn  } from "typeorm";
import { Product } from "./Product";
@Entity('productCategory')
export class ProductCategory extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable:false
    })
    categoryname!: string;

    // @OneToMany(() => Product, singleprod => singleprod.product)
    // @JoinColumn({
    //     name: 'id'
    // })
    // category!: Product[];
}