console.log("加载成功");
// 配置要引入的模块路径
require.config({
    paths:{
        jquery:"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        list:"list"

    },
    // 设置依赖关系
    shim:{
        "jquery-cookie":["jquery"]
    }
})

// 调用banner代码
require(["list"],function(list){
    list.body();
})