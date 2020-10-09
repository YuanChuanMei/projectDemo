
export default ajax;

function ajax({type = "get",url,data,success,error}){
    //1.生成Ajax对象
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //2.调用open方法
    if(type === 'get' && data){
        url += "?" + querystring(data);
    }
    xhr.open(type,url,true);
    //3.调用send
    if(type === 'get'){
        xhr.send();
    }else{
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data && querystring(data));
    }

    //4.拿数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success && success(xhr.responseText);
            }else{
                error && error("Error:" +xhr.status);
            }
        }
    }
}
function querystring(obj){
    var str = ``;
    for(var attr in obj){
        str += `${attr}=${obj[attr]}&`;
    }
    return str.substring(0,str.length - 1);
}