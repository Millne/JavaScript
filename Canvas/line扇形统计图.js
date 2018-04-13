void function (win) {
    function Pipe(x, y, r, data, colors) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.data = data;
        this.colors = colors;
    }
    //角度转换为弧度
    function changeAngle(ang) {
        return (( Math.PI / 180 ) * ang);
    }
    //混合式继承
    function deepCopy(op1,op2) {
        for( var key in op1 ){
            if( op1.hasOwnProperty(key) ){
                op2[key] = op1[key];
            }
        }
    }
    deepCopy({
        draw:function (ctx) {
            var self = this;
            //求每个数字所占的弧度
            var num = 0;
            this.data.forEach(function (obj) {
                num += obj.val;
            });
            var per = 360 / num;
            //初始化 开始角度跟结束角度
            var startRad = 0;
            var endRad = 0;
            this.data.forEach(function (obj, index) {

                ctx.shadowOffsetX = 0; // 阴影Y轴偏移
                ctx.shadowOffsetY = 0; // 阴影X轴偏移
                ctx.shadowBlur = 20; // 模糊尺寸
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色
                startRad = endRad;
                endRad = endRad + obj.val * per;
                ctx.beginPath();
                ctx.moveTo(self.x, self.y);
                ctx.arc(self.x, self.y, self.r, changeAngle(startRad), changeAngle(endRad));
                ctx.closePath();
                ctx.fillStyle = self.colors[index];
                ctx.fill();

                /*
                * 求扇形的垂直线 (出线的起点坐标)
                *
                *
                * */
                //中间角度
                var middleRad = ( endRad - startRad ) / 2;
                //斜线   cos中传的是弧度 而不是角度
                var slash =  self.r - 10 ;//Math.cos(changeAngle(middleRad)) * self.r;
                var jiao = changeAngle(startRad) + changeAngle(middleRad);
                var jiaoD = startRad + middleRad;

                var b = {
                    x: slash * Math.cos(jiao) + self.x,
                    y: slash * Math.sin(jiao) + self.y
                }
                //画 出线的起点
                ctx.beginPath();
                ctx.fillStyle = '#585759';
                ctx.fillRect(b.x, b.y, 2,2);
                ctx.closePath();

                ctx.fill();

                //画出线
                var long = 25;    //设置出线长度
                ctx.beginPath();
                var lo = {
                    x: long * Math.cos(jiao) + b.x,
                    y: long * Math.sin(jiao) + b.y
                }
                ctx.font="15px Georgia";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                var a = ((( endRad - startRad ) / 360) * 100).toFixed(2) + '%' + '('+ obj.tab +')';
                ctx.beginPath();
                ctx.strokeStyle = '#881eff';
                ctx.moveTo( b.x + 1, b.y + 1 );
                ctx.lineTo( lo.x, lo.y );
                if( jiaoD >= 0 && jiaoD < 90 || jiaoD >= 270 ){
                    ctx.lineTo( lo.x + 100, lo.y );
                    ctx.fillText(a,lo.x + 40,lo.y);
                }else if( jiaoD >= 90 && jiaoD < 270 ){
                    ctx.lineTo( lo.x - 100, lo.y );
                    ctx.fillText(a,lo.x - 40,lo.y);
                }
                ctx.stroke();
            });
        }
    },Pipe.prototype);
win.Pipe = Pipe;
}(window);