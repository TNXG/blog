document.onreadystatechange = function(){
    if(document.readyState == "complete"){
        var ele = document.createElement("script");
        ele.src = "https://hpp.loyunet.cn/hpp/api/getblogeractive";
        document.body.appendChild(ele);
     }
}