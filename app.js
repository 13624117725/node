var express = require("express");
var app = new express()
//  中间键 表示匹配任何路由
app.use((res,req,next)=>{
    next()
})

// 内置中间件
// app.use(express.static('public'));

// app.get("/",(req,res)=>{
//     res.send("你好，express")
// })

app.get("/news/:fnames",(req,res)=>{
    console.log(req.query)
    res.send("你好，news"+req.params.fnames)
    var MFn = require(`./methods/${req.params.fnames}`);
    MFn(req.query.url)

})
// //  中间键 表示匹配不到任何路由
// app.use((res,req)=>{
   
//     req.status(404).send()
// })
app.listen(8080,"192.168.0.102")