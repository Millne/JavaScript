//  保存方法
function drawFillRound(ctx, x, y) {
    ctx1.beginPath();
    ctx.fillStyle = '#818181';
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
}
function drawStroRound(ctx, x, y, color) {
    ctx.beginPath();
    ctx.strokeStyle = color || '#818181';
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.stroke();
}
// 计算斜线 以及比例
function calcSlashs(arr) {
    var newArr = arr.map(function (val, index) {
        if( arr[index + 1] != undefined ){
            return perFun(val.x, val.y, arr[index + 1].x, arr[index + 1].y);
        }else{
            return '';
        }
    });
    newArr.length = newArr.length - 1;
    return newArr;
}
// 求斜边
function slashFun(starX,starY,endX,endY) {
    return Math.sqrt( Math.pow( ( endX - starX ), 2 ) + Math.pow( ( endY - starY ), 2 ) );
}
// 求比例
function perFun(starX,starY,endX,endY) {
    var x = endX - starX ;
    var y = endY - starY ;
    var long = slashFun(starX,starY,endX,endY);
    var perX = x / long;
    var perY = y / long;
    return { perX: perX, perY: perY, long:long };
}
function moveLoc(starX,starY,endX,endY) {
    moveLong = slashFun(starX,starY,endX,endY) * zhenPro;
    var x = starX + moveLong * zhenPro * perFun(starX,starY,endX,endY).perX;
    var y = starY + moveLong * zhenPro * perFun(starX,starY,endX,endY).perY;
    return { x:x, y:y };
}
