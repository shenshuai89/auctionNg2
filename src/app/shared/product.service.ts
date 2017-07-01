import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  constructor() { }
  private products:Product[] = [
    new Product (1,'第一个商品',1.99,3.6,'这是第一个商品的描述',["电子产品","硬件设备"]) ,
    new Product (2,'第二个商品',2.99,4.6,'这是第二个商品的描述',["图书"]) ,
    new Product (3,'第三个商品',3.99,2.1,'这是第三个商品的描述',["硬件设备"]) ,
    new Product (4,'第四个商品',4.99,3.1,'这是第四个商品的描述',["电子产品","硬件设备"]) ,
    new Product (5,'第五个商品',5.99,2.6,'这是第五个商品的描述',["电子产品","硬件设备"]) ,
    new Product (6,'第六个商品',6.99,1.6,'这是第六个商品的描述',["图书"])
  ]

  private comments:Comment[] =[
    new Comment(1, 1, '2017-6-22 10:10:10', 'sam', 3, '东西很好'),
    new Comment(2, 1, '2017-6-23 21:10:10', 'lili', 4, '东西不错'),
    new Comment(3, 1, '2017-6-24 13:10:10', 'jim', 5, '东西很好'),
    new Comment(4, 2, '2017-6-25 14:10:10', 'tom', 2, '东西还行')
  ]

  getAllCategories():string[]{
    return ["电子产品","硬件设备","图书"]
  }
  getProducts(): Product[]{
    return this.products;
  }
  getProduct(id:number):Product{
    return this.products.find((product) => product.id == id)
  }
  getCommentsForProductId(id:number):Comment[]{
    return this.comments.filter((comment) => comment.productId == id )
  }

}

export class Product {
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ){}

}

export class Comment{
  constructor(public id:number,
              public productId:number,
              public timestamp:string,
              public user:string,
              public rating:number,
              public content:string
  ){}

}
