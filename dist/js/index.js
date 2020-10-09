define(["jquery"],function(jquery){
    function body(){
        var obtns = $("#tab").find("a");
            // console.log(obtns);
            var oDivs = $("#tab").find("div");
            // console.log(oDivs);

            obtns.mouseover(function(){
                obtns.attr("class","");
                oDivs.css("display",'none').eq($(this).index()).css("display", 'block');
                $(this).attr("class","active");
            })
            $("#close").click(function(){
                $("#sidebar").css("display","none");
            })
            $(window).scroll(function(){
                // var ifscroll = false;
                // var top = $(window).scrollTop();
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop// chrome
                // console.log(scrollTop);
                if(scrollTop > 500){
                    $("#sidebar").css("display","block");
                }
                else{
                    $("#sidebar").css("display","none");
                }
            })
    }
    return {
        body:body
    }
})