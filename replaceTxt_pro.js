function changeTxt(str, obj) {
    var newStr;
    change(str);
    function change(str) {
        var res = reg.exec(str);
        if (res != null) {
            str = str.replace(res, obj[res[0]]);
            change(str);
        }else{
            newStr = str;
        }
    }
    return newStr;
}

//   replaceTxt   all   {{  }};

function replaceTxt(str,obj) {
     var reg = /{{(\w+)}}/;
     while(reg.exec(str) != null){
         var txt = reg.exec(str);
         str = str.replace( txt[0], obj[txt[1]] );
     }
     return str;
}











