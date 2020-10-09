<?php
    header("Content-type:text/html;charset=utf-8");
    //模拟官方的返回，生成对应的内容
    $responseData = array("code" => 0,"msg" => "");
    //将输入数据取出
    $username = $_POST["username"];
    $password = $_POST['password'];

    //判断取出的各个数据
    if(!$username){
        $responseData['code'] = 1;
        $responseData['msg'] = '用户名不能为空';
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData['code'] = 2;
        $responseData['msg'] = '密码不能为空';
        echo json_encode($responseData);
        exit;
    }
    
    //验证数据库中是否有同名的用户
    //连接数据库
    $link = mysql_connect("localhost","root","123456");
    //判断是否连接成功
    if(!$link){
        $responseData['code'] = 3;
        $responseData['msg'] = '服务忙';
        echo json_encode($responseData);
        exit;
    }
    //设置字符集
    mysql_set_charset("utf8");
    //选择数据库
    mysql_select_db("qd2004");
    //准备sql语句
    $password = md5(md5(md5($password).'wangyibo')."liyifeng");
    $sql = "select * from project where username='{$username}' and password='{$password}'";
    // echo $sql;
    //发送sql语句
    $res = mysql_query($sql);
    //从数据库中取出数据（一行）
    $row = mysql_fetch_assoc($res);
    if($row){
        // $responseData['code'] = 5;
        $responseData['msg'] = '登录成功';
        echo json_encode($responseData);
        // exit;
    }else{
        $responseData['code'] = 4;
        $responseData['msg'] = '用户名或密码错误';
        echo json_encode($responseData);
        exit;
    }
   

    //关闭数据库
    mysql_close($link);
    
?>