console.log("加载成功");
// 配置要引入的模块路径
require.config({
    paths:{
        jquery:"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        startMove:"startMove",
        banner:"banner",
        index:"index"

    },
    // 设置依赖关系
    shim:{
        "jquery-cookie":["jquery"]
    }
})

// 调用banner代码
require(["banner","index"],function(banner,index){
    banner.shuffling();
    index.body();
})