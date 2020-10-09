define(["jquery","jquery-cookie"],function($){
    function shopping(){
            goods_msg();
            goods_num();
            // sum();

            // 给删除按钮添加点击
            $("table").on("click","#delete",function(){
				var id = $(this).closest("tr").remove().attr("id");
				// 删除页面上的节点  从cookie中删除数据
				var cookieArr = JSON.parse($.cookie("goods"));
				for(var i = 0; i < cookieArr.length;i ++){
					if(cookieArr[i].id == id){
						cookieArr.splice(i,1);
						break;
					}
				}
				if(cookieArr.length){
					$.cookie("goods",JSON.stringify(cookieArr),{
						expires:7
					})
				}else{
					$.cookie("goods",null);
				}
				goods_num();
			})

            // 给+ - 添加点击
            $("table").on("click",".goods_btn button",function(){
				var id = $(this).closest("tr").attr("id");
				var cookieArr = JSON.parse($.cookie("goods"));
				for(var i = 0;i < cookieArr.length;i++){
					if(cookieArr[i].id == id){
						break;
					}
				}
				if(this.innerHTML == "+"){
                    cookieArr[i].num++;
                    $(this).prev("#sum").html(`${cookieArr[i].num}`);
				}else{
                    cookieArr[i].num == 1 ? alert("数量为1，不能继续减少了") : cookieArr[i].num--;
                    $(this).next("#sum").html(`${cookieArr[i].num}`);
				}
				$.cookie("goods",JSON.stringify(cookieArr),{
					expires:7
				})
				// 修改总数量
				goods_num();
			})

            function goods_msg(){
                var cookieStr = $.cookie("goods");
				if(!cookieStr){
					return;
				}
                // 下载所有的商品数据
				$.ajax({
					url:"../data/data1.json",
					success:function(arr){
						var cookieArr = JSON.parse(cookieStr);
						var newArr = [];
						for(var i = 0;i < arr.length; i ++){
							for(var j = 0;j < cookieArr.length;j ++){
								if(cookieArr[j].id == arr[i].id){
									arr[i].num = cookieArr[j].num;
									newArr.push(arr[i]);
									break;
								}
							}
						}
						// 处理数据，将数据添加在页面上
						var str = ``;
						for(var i = 0;i < newArr.length;i ++){
							str +=`
                            <tr class="content_tr" id="${newArr[i].id}">
                     <td><img src="${newArr[i].img}" alt=""><a href="#">${newArr[i].name}</a></td>
                    <td>${newArr[i].price1}</td>
                    <td class="price">￥${newArr[i].price2}元</td>
                    <td class="goods_btn"><button>-</button><span id="sum">${newArr[i].num}</span><button>+</button></td>
                    <td class="prices"> ${(newArr[i].price2 * newArr[i].num).toFixed(2)}元 </td>
                    <td id="delete"><a href="#">删除</a></td> 
                    <td><input type="checkbox" id="check${newArr[i].id}"class="checks"></td>
                 </tr>`;
						}
                        $("table .first").after(str);
                        // $("#amount").find("span").html($(".prices").val());
                        var trs = $(".content_tr");
                            //  console.log(trs);
                             var total=0;
                             for(var i=0;i<trs.length;i++){
                                 var money=parseInt($(".prices").html());
                                 total+=money;
                             }
                            $("#amount").find("span").html(total);
					},
					error:function(msg){
						console.log(msg);
                    }
                   
                })
            }
                // 处理数量
                function goods_num(){
                    var cookieStr = $.cookie("goods");
                    var sum = 0;
                    if(cookieStr){
                        var cookieArr = JSON.parse(cookieStr);
                        for(var i = 0; i < cookieArr.length;i++){
                            sum += cookieArr[i].num;
                        }
                    }
                    $(".goods_num").html(sum);
                }
                all();
                // 全选
                function all(){
                    // 获取元素，获取全选按钮和下面小的复选框
                    var cekall = document.getElementById('selectAll');
                    var inp = document.querySelector('tbody').getElementsByClassName('checks');
                    // var inp = $('checks');
                    // console.log(inp);
                    // 给全选按钮添加点击事件
                    cekall.onclick = function(){
                        // this.checked  可以得到当前复选框的选中状态，如果是 true 就是选中，如果是 false 就是未选中
                        // console.log(this.checked);
                        for(var i=0; i< inp.length; i++){
                            inp[i].checked = this.checked;
                            //2、下面的复选框要全部选中，上面的全选按钮才能够全部选中，给下面的所有复选框绑定事件，每次点击，都要循环查看下面下面所有的复选框是否有没选中的，如果有没选中的复选框，那么上面的全选按钮就不选中。
                            inp[i].onclick = function(){
                                // 设置一个变量来控制按钮是否全部选中
                                // console.log(this.checked);
                                if(!this.checked){
                                    cekall.checked = false;
                                }else{
                                    var unchecked = document.querySelector(".content_tr input:not(:checked)");
                                    console.log(unchecked);
                                    if(unchecked===null){
                                        cekall.checked = true;
                                    }
                                }
                            }
                        }
                    }
                }
    }
    return {
        shopping:shopping
    }
})