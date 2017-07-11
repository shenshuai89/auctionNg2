import * as express from 'express';
import {Server} from 'ws'

const app = express();

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

const products:Product[] = [
    new Product (1,'第一个商品',1.99,3.6,'这是第一个商品的描述',["电子产品","硬件设备"]) ,
    new Product (2,'第二个商品',2.99,4.6,'这是第二个商品的描述',["图书"]) ,
    new Product (3,'第三个商品',3.99,2.1,'这是第三个商品的描述',["硬件设备"]) ,
    new Product (4,'第四个商品',4.99,3.1,'这是第四个商品的描述',["电子产品","硬件设备"]) ,
    new Product (5,'第五个商品',5.99,2.6,'这是第五个商品的描述',["电子产品","硬件设备"]) ,
    new Product (6,'第六个商品',6.99,1.6,'这是第六个商品的描述',["图书"])
]

const comments:Comment[] =[
    new Comment(1, 1, '2017-6-22 10:10:10', 'sam', 3, '东西很好'),
    new Comment(2, 1, '2017-6-23 21:10:10', 'lili', 4, '东西不错'),
    new Comment(3, 1, '2017-6-24 13:10:10', 'jim', 5, '东西很好'),
    new Comment(4, 2, '2017-6-25 14:10:10', 'tom', 2, '东西还行')
]

app.get('/',(req,res) => {
    res.send("hello Express");
})

app.get('/api/products', (req, res) => {
    let result = products;
    let params = req.query;

    if (params.title){
        result = result.filter((p) => p.title.indexOf(params.title) !== -1)
    }
    if (params.price && result.length>0){
        result = result.filter((p) => p.price <= parseInt(params.price))
    }
    if (params.category && params.category !== "-1" && result.length > 0){
        result = result.filter((p) => p.categories.indexOf(params.category) !== -1)
    }

    res.json(result)
})

app.get('/api/product/:id',(req,res) =>{
    res.json(products.find((product)=> product.id == req.params.id))
})

app.get('/api/product/:id/comments',(req,res) =>{
    res.json(comments.filter((comment:Comment)=> comment.productId == req.params.id))
})

const server = app.listen(8000, 'localhost', ()=>{
    console.log("服务器启动成功")
})

const wsServer = new Server({ port:8085 })
wsServer.on("connection", websocket => {
    // 服务器给客户端推送消息
    websocket.send("这个消息是服务器主动推送的")
    // 服务器接收到客户端发送来的消息
    websocket.on("message", message =>{
        console.log("接收到消息："+message)
    })
})

setInterval(()=>{
    if(wsServer.clients){
        wsServer.clients.forEach((client) =>{
            client.send("这是定时推送消息")
        })
    }
},2000)


