//要封装一个歌曲管理的工具
//特征：歌曲列表
//行为：增  删  改 查


//   模拟一个歌曲库

// var SonLib = [
//     {
//         "sin":"周杰伦",
//         "son":[1,2,3,4,5,6,7]
//     }
// ]

// this.push({
//     "sin": sin ,
//     "son": [son],
// });
function CreateSonLib() {
}
// 继承数组的方法属性
CreateSonLib.prototype = new Array;
//   添加  增  删  改 查  方法

//  增
CreateSonLib.prototype.addSon = function (son, sin) {
    if( this.sechSin(sin) ){
        var index = this.sechSin(sin).index;
        if( SonLib[index].son.indexOf != '-1' ){
            alert("歌曲已经存在");
        }else{
            SonLib[index].son.push(son);
        }
    }else{
        SonLib.push(
            {
                "sin":sin,
                "son":[son]
            }
        )
    }
};
//  删
CreateSonLib.prototype.delSon = function (son, sin) {
    var sup, index;
    if( son !== '' && sin !== '' ){
        if( this.sechSin(sin) ){
            index = this.sechSin(sin).index;
            sup = SonLib[index].son.indexOf;
            if(  sup != '-1' ){
                SonLib[index].son.splic(sup, 1);
            }else{
                alert("您要删除的歌曲不存在！");
            }
        }else{
            alert("您要删除的歌手不存在！");
        }
    }else if( son !== '' && sin === '' ){
        if( this.sechSon(son) ){
            sup = this.sechSon(son).sup;
            index = this.sechSon(son).index;
            SonLib[index].son.splice(sup,1);
        }else{
            alert('您要删除的歌曲不存在！');
        }
    }else if( son === '' && sin !== '' ){
        if( this.sechSin(sin) ){
            index = this.sechSin(sin).index;
            SonLib.splice(index,1);
        }
    }
}
//  改
CreateSonLib.prototype.cgeSon = function (son, sin, res) {
    if( sin != '' ){
        if( this.sechSin(sin) ){
            if( this.sechSon(son) ){
                var index, sup;
                index = this.sechSon(son).index;
                sup = this.sechSon(son).sup;
                SonLib[index].son[sup] = res;
            }else{
                alert("您输入的歌曲不存在！");
            }
        }else{
            alert('您输入的歌手不存在！');
        }
    }else{
        alert("请输入歌手！");
    }
}
//  查
CreateSonLib.prototype.sechSon = function (son) {
    var index, txt, sup;
    for( let i=0; i<SonLib.length; i++ ){
        if( SonLib[i].son.indexOf(son) != '-1' ){
            sup = SonLib[i].son.indexOf(son);
            index = i;
            txt = "歌名为：" + son + "<br />歌手是："+ SonLib[i].sin + "<br />";
            return {txt:txt,sup:sup,index:index };
        }
    }
    return false;
}
CreateSonLib.prototype.sechSin = function (sin) {
    var txt;
    for( let i=0; i<SonLib.length; i++ ){
        if( SonLib[i].sin == sin ){
            var str = SonLib[i].son.join();
            txt = "歌名为：" + str + "<br />歌手是："+ sin + "<br />";
            return {txt:txt,index:i};
        }
    }
    return false;
}
CreateSonLib.prototype.sechAll = function () {
    var txt = '', sonT;
    for( var i=0; i<SonLib.length; i++ ){
        sonT = SonLib[i].son.join();
        txt += "歌名为：" + sonT + "<br />歌手是："+SonLib[i].sin + "<br /><hr />";
    }
    showResult(txt);
}
function showResult(txt) {
    var result = document.getElementById('result');
    result.innerHTML = '';
    result.innerHTML += txt;
}
//  实例化对象   创建库
var SonLib = new CreateSonLib();
SonLib.push(
    {
        "sin": "周杰伦" ,
        "son": ['蜗牛',"不能说的秘密","青花瓷"]
    },
    {
        "sin":"林俊杰",
        "son":["小酒窝"]
    }
);
console.log(SonLib);

// 给按钮绑定事件
var add_btn = document.getElementById('add_btn'),
    del_btn = document.getElementById('del_btn'),
    cge_btn = document.getElementById('cge_btn'),
    son_sech_btn = document.getElementById('son_sech_btn'),
    sin_sech_btn = document.getElementById('sin_sech_btn'),
    all_sech_btn = document.getElementById('all_sech_btn');


add_btn.onclick = function (ev) {
    var son = document.getElementsByClassName('add_son')[0].value;
    var sin = document.getElementsByClassName('add_sin')[0].value;
    SonLib.addSon(son, sin);
}
del_btn.onclick = function (ev) {
    var son = document.getElementsByClassName('del_son')[0].value;
    var sin = document.getElementsByClassName('del_sin')[0].value;
    SonLib.delSon(son, sin);
}
cge_btn.onclick = function (ev) {
    var son = document.getElementsByClassName('cge_son')[0].value;
    var sin = document.getElementsByClassName('cge_sin')[0].value;
    var res = document.getElementsByClassName('cge_res')[0].value;
    SonLib.cgeSon(son, sin, res);
}
son_sech_btn.onclick = function (ev) {
    var val = document.getElementsByClassName('sech_son')[0].value;
    if( SonLib.sechSon(val) == false ){
        alert('查询不到此歌曲！');
    }else{
        var txt = SonLib.sechSon(val);
        showResult(txt.txt);
    }
}
sin_sech_btn.onclick = function (ev) {
    var val = document.getElementsByClassName('sech_sin')[0].value;
    if( SonLib.sechSin(val) == false ){
        alert('查询不到此歌手！');
    }else{
        var txt = SonLib.sechSin(val);
        showResult(txt.txt);
    }
}
all_sech_btn.onclick = function (ev) {
    SonLib.sechAll();
}

