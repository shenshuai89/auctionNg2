"use strict";
var express = require('express');
var ws_1 = require('ws');
var app = express();
var Product = (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var Comment = (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(1, '第一个商品', 1.99, 3.6, '这是第一个商品的描述', ["电子产品", "硬件设备"]),
    new Product(2, '第二个商品', 2.99, 4.6, '这是第二个商品的描述', ["图书"]),
    new Product(3, '第三个商品', 3.99, 2.1, '这是第三个商品的描述', ["硬件设备"]),
    new Product(4, '第四个商品', 4.99, 3.1, '这是第四个商品的描述', ["电子产品", "硬件设备"]),
    new Product(5, '第五个商品', 5.99, 2.6, '这是第五个商品的描述', ["电子产品", "硬件设备"]),
    new Product(6, '第六个商品', 6.99, 1.6, '这是第六个商品的描述', ["图书"])
];
var comments = [
    new Comment(1, 1, '2017-6-22 10:10:10', 'sam', 3, '东西很好'),
    new Comment(2, 1, '2017-6-23 21:10:10', 'lili', 4, '东西不错'),
    new Comment(3, 1, '2017-6-24 13:10:10', 'jim', 5, '东西很好'),
    new Comment(4, 2, '2017-6-25 14:10:10', 'tom', 2, '东西还行')
];
app.get('/', function (req, res) {
    res.send("hello Express");
});
app.get('/api/products', function (req, res) {
    var result = products;
    var params = req.query;
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.category && params.category !== "-1" && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, 'localhost', function () {
    console.log("服务器启动成功");
});
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    // 服务器给客户端推送消息
    websocket.send("这个消息是服务器主动推送的");
    // 服务器接收到客户端发送来的消息
    websocket.on("message", function (message) {
        console.log("接收到消息：" + message);
    });
});
setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send("这是定时推送消息");
        });
    }
}, 2000);
