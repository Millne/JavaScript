function CreateCoord(cvs, pad, aro) {
    this.cvs = cvs;
    this.padding = {
        top:pad.top,
        right:pad.right,
        bottom:pad.bottom,
        left:pad.left
    };
    this.arrow = {
        width:aro.width,
        height:aro.height
    };
    this.vertexTop = {
        x: pad.left,
        y: pad.top,
    };
    this.vertexRight = {
        x: cvs.width - pad.right,
        y: cvs.height - pad.bottom
    };
    this.origin = {
        x: pad.left,
        y: cvs.height - pad.bottom
    };
}
CreateCoord.prototype.drawCoord = function (ctx) {
    // 画坐标轴中的两条线Create
    ctx.moveTo( this.vertexTop.x, this.vertexTop.y );
    ctx.lineTo( this.origin.x, this.origin.y );
    ctx.lineTo( this.vertexRight.x, this.vertexRight.y );
    ctx.stroke();

    // 画上顶点箭头
    ctx.beginPath();
    ctx.moveTo( this.vertexTop.x, this.vertexTop.y );
    ctx.lineTo( this.vertexTop.x - this.arrow.width / 2, this.vertexTop.y + this.arrow.height );
    ctx.lineTo(this.vertexTop.x, this.vertexTop.y + this.arrow.height/2);
//        ctx.moveTo( vertexTop.x, vertexTop.y );
    ctx.lineTo( this.vertexTop.x + this.arrow.width / 2, this.vertexTop.y + this.arrow.height );
//        ctx.stroke();
    ctx.closePath();
    ctx.fill();

    // 画右顶点箭头
    ctx.beginPath();
    ctx.moveTo( this.vertexRight.x, this.vertexRight.y );
    ctx.lineTo( this.vertexRight.x - this.arrow.height, this.vertexRight.y - this.arrow.width / 2 );
    ctx.lineTo( this.vertexRight.x - this.arrow.height/2, this.vertexRight.y );
//        ctx.moveTo( vertexRight.x, vertexRight.y );
    ctx.lineTo( this.vertexRight.x - this.arrow.height, this.vertexRight.y + this.arrow.width / 2 );
    ctx.closePath();
    ctx.fill();
}
CreateCoord.prototype.drawLineC = function (data, ctx){
    var maxX = this.cvs.width - this.padding.left - this.padding.right - this.arrow.height;
    var maxY = this.cvs.height - this.padding.top - this.padding.bottom - this.arrow.height;

    var perX = maxX / data.length;
    var perY = maxY / Math.max.apply(null,data);

    var newArr = data.map(function (val, index) {
        return val * perY;
    })
    //在坐标轴中指定的位置画点
    var origin = this.origin;
    newArr.forEach(function(val,index){
        ctx.fillRect(origin.x + index * perX - 2, origin.y -val - 2,4,4);
    });

    //在坐标轴中画折线
    ctx.beginPath();
    newArr.forEach(function(val,index){
        ctx.lineTo(origin.x +index * perX, origin.y -val);
    });
    ctx.stroke();
}














