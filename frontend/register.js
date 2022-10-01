const { post } = require("../backendserver/routes");

function register(){
    var user = {};
    user.username = $("#username").val();
    user.password= $("#password").val();
    console.log("user: ",user);
    callAjaxServiceVrt("",user,"POST")
    
}

function callAjaxServiceVrt(uri, json, type){
        uri = "http://localhost:8080/"+ uri;
        console.log("data in callAjax: ",JSON.stringify(json));
        var result;
        $.ajax({
            url: uri,
            type: type,
            crossDomain: true,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(json),
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
                console.log(uri);
                result = data;
            },
            error: function (jqXHR, status, error) {
                console.error(jqXHR);
                result = {};
            }
        });
        
        return result;
        
    }
