define(["shoppingCar","jquery","jquery-cookie"],function(shoppingCar,$){
    function list(){
        $(function(){
            // 加载数据
            $.ajax({
                url:"../data/data1.json",
                success:function(arr){
                    var str = ``;
                    for(var i = 0; i < arr.length;i++){
                        str += `
                                <ul>
                                <li class="imgs"><a href="./details.html"><img src="${arr[i].img}"></a></li>
                                <li class="name"><a href="#">${arr[i].name}</a></li>
                                <li class="price1">市场价:<s>${arr[i].price1}</s></li>
                                <li class="price2">本店价：<span>${arr[i].price2}</span>（已有人评论）</li>
                                <li class="add"><a href="#">加入收藏</a><a id="${arr[i].id}" class="btn">放入购物车</a></li>
                                </ul> `
                    }
                    $("#list").html(str);
                },
                error:function(msg){
                    console.log(msg);
                }
            })
            // 给加入购物车按钮添加点击事件
            $("#list").on("click",".btn",function(){
                // 取出当前点击加入购物车按钮的id
                var id = this.id;
                // 判断是否是第一次添加
                var first = $.cookie("goods") == null ? true :false;
                if(first){
                    $.cookie("goods",JSON.stringify([{id:id,num:1}]),{
                        expires:7
                    })
                }else{
                    // 不是第一次，判定之前是否添加过
                    var cookieArr = JSON.parse($.cookie("goods"));
                    var same = false;//假设没有相同数据
                    for(var i = 0;i < cookieArr.length;i ++){
                        if(cookieArr[i].id == id){
                            same = true;
                            break;
                        }
                    }
                    same ? cookieArr[i].num++ : cookieArr.push({id:id,num:1});
                    $.cookie("goods",JSON.stringify(cookieArr),{
                        expires:7
                    })
                }
                shoppingCar.shopping.goods_msg();
                shoppingCar.shopping.goods_num();
            })
            // 
        
        })
    }
    return {
        list:list
    }
})
