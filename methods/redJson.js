module.exports = function(str){
    var fs = require( 'fs' );
    // stat = fs.stat;
    const path = require('path');
    let p = ""
    // 获得文件路径
    fs.exists("../../test",exists=>{
         if(exists){
             fs.readdir('../../test',function(err,files){
                  if(err){
                     console.log("读取文件夹下7文件失败");
                  }else{
                     console.log("7文件夹下有"+files.length+"个文件");
                     for(var i=0;i<files.length;i++){
                         p=path.resolve(__dirname,'../../test')+path.sep
                         p=p+files[i];
                         console.log("----"+p)
                         fs.stat(p,function(err,stat){
                            if(err){
                                console.log("查看文件夹7下的文件信息失败");
                            }else{
                                if(stat.isFile()){
                                    fs.realpath(p,function(err,resolvePath){
                                        if(err){
                                            throw err;
                                          //console.log("查看文件绝对路径失败");
                                        }else{
                                           console.log("文件的路径为"+resolvePath)
                                        }
                                         
                                    })
                                    
                                }
                            }
                         })
                     }
                  }
             })
         }
         if(!exists){
            console.log("文件不存在")
         }
    })   
   // 修该json
    fs.readFile(path.join(__dirname,  '../../test','test.json'), 'utf8', function (err, data) {
        if (err) throw err;
        let jsonData = JSON.parse(data);
        console.log(jsonData)  
        let newOBJ = new Object()
        for(let key in jsonData){
            if(!newOBJ[key]){
                newOBJ[key]=jsonData[key]
            }
        }
        let newContent = JSON.stringify(newOBJ, null, 4);
        fs.writeFile(path.join(__dirname,  '../../test2','test.json'), newContent, 'utf8', (err) => {
            if (err) throw err;
            console.log('success done');
        });
    }) 
    // 修该wxml
    fs.readFile(path.join(__dirname,  '../../test/pages','me.wxml'), 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data)
        let data2 = data.replace(/view/g,"div");
        fs.exists(path.join(__dirname,  '../../test2/pages'),exists=>{
            if(!exists){
                // 文件夹不存在
                fs.mkdir(path.join(__dirname,  '../../test2/pages'),err=>{
                    if (err) throw err;
                    console.log('success done');
                });
            }
        })
        fs.writeFile(path.join(__dirname,  '../../test2/pages','me.aml'), data2, 'utf8', (err) => {
            if (err) throw err;
            console.log('success done');
        });
    })
    // // 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
    // var copy = function( src, dst ){
    //     // 读取目录中的所有文件/目录
    //     fs.readdir( src, function( err, paths ){
    //         if( err ){
    //             throw err;
    //         }
    //         paths.forEach(function( path ){
    //             var _src = src + '/' + path,
    //                 _dst = dst + '/' + path,
    //                 readable, writable;      
    //             stat( _src, function( err, st ){
    //                 if( err ){   
    //                     throw err;
    //                 }
    //                 // 判断是否为文件
    //                 if( st.isFile() ){    
    //                     // 创建读取流
    //                     readable = fs.createReadStream( _src );
    //                     // 创建写入流
    //                     writable = fs.createWriteStream( _dst ); 
    //                     // 通过管道来传输流
    //                     readable.pipe( writable );
    //                 }
    //                 // 如果是目录则递归调用自身
    //                 else if( st.isDirectory() ){
    //                     exists( _src, _dst, copy );
    //                 }
    //             });
    //         });
    //     });
    // };
    // // 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
    // var exists = function( src, dst, callback ){
    //     fs.exists( dst, function( exists ){
    //         // 已存在
    //         if( exists ){
    //             callback( src, dst );
    //         }
    //         // 不存在
    //         else{
    //             fs.mkdir( dst, function(){
    //                 callback( src, dst );
    //             });
    //         }
    //     });
    // };
 
    // 复制目录
    // exists( '../../test', '../../test2', copy );
    




}