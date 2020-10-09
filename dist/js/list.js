define(["jquery"],function(jquery){
    function body(){
        $.ajax({
            url:"../data/data1.json",
            success:function(arr){
                var str = ``;
                for(var i = 0; i < arr.length;i++){
                    str += `
                            <ul>
                            <li class="imgs"><a href="#"><img src="${arr[i].img}"></a></li>
                            <li class="name"><a href="#">${arr[i].name}</a></li>
                            <li class="price1">市场价:<s>${arr[i].price1}</s></li>
                            <li class="price2">本店价：<span>${arr[i].price2}</span>（已有人评论）</li>
                            <li class="add"><a href="#">加入收藏</a><a href="#">放入购物车</a></li>
                            </ul> `
                }
                $("#list").html(str);
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    return {
        body:body
    }
})